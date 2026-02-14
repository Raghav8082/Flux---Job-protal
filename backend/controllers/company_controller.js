
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
import {Company} from '../models/company_model.js';
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
dotenv.config();



export const registercompany = async(req,res)=>{
    try{

        const userId = req.userId ?? req.id;
        if (!userId) {
            return res.status(401).json({
                message:"Unauthorized access",
                success:false
            });
        }

        const rawName = req.body?.name;
        const name = typeof rawName === "string" ? rawName.trim() : "";
        if(!name){
            return res.status(400).json({
                message:"Company name is required",
                success:false
            });
        }

        // Atomic "create or return existing" to avoid races.
        // Return the document directly (more consistent than `rawResult` across Mongoose versions).
        const company = await Company.findOneAndUpdate(
            { name, userId },
            { $setOnInsert: { name, userId } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success:true
        });

    }
    catch(error){
        if (error?.code === 11000) {
            // Duplicate key. Most likely causes:
            // - Legacy unique index on `name` only (global uniqueness)
            // - Rare race condition (two requests at once)
            const keyPattern = error?.keyPattern || error?.keyValue;
            const isLegacyGlobalNameIndex =
              (error?.keyPattern?.name && !error?.keyPattern?.userId) ||
              (error?.keyValue?.name && !error?.keyValue?.userId);

            // If it's a race with the correct compound index, fetch and return the existing company.
            const userId = req.userId ?? req.id;
            const rawName = req.body?.name;
            const name = typeof rawName === "string" ? rawName.trim() : "";
            if (!isLegacyGlobalNameIndex && userId && name) {
                const existing = await Company.findOne({ name, userId });
                if (existing) {
                    return res.status(200).json({
                        message:"Company already registered",
                        company: existing,
                        success:true
                    });
                }
            }

            return res.status(400).json({
                message: isLegacyGlobalNameIndex
                  ? "Company name already exists (drop old unique index on `name`)"
                  : "Company already registered",
                details: keyPattern,
                success:false
            });
        }

            console.log("Error during company registration:", error);
            const isProd = process.env.NODE_ENV === "production";
            return res.status(500).json({
                message: isProd ? "Error during registration" : (error?.message || "Error during registration"),
                success:false
            });
    }
}

export const getcompany = async(req,res)=>{
    try{
        const userId = req.userId ?? req.id;
        const companies = await Company.find({ userId });
        return res.status(200).json({
            message:"Companies fetched successfully",
            companies:companies,
            success:true
        });
    }
    catch(error){
        console.log("Error fetching companies:", error);
        return res.status(500).json({
            message:"Error fetching companies",
            success:false
        });
    }
}

 export const getcompanybyid = async(req,res)=>{
    try{
        const companyid = req.params.id;
        const userId = req.userId ?? req.id;
        const company = await Company.findOne({ _id: companyid, userId });

        if(!company){       
            return res.status(404).json({
                message:"Company not found",
                success:false
            });
        }
        return res.status(200).json({
            message:"Company fetched successfully",
            company:company,
            success:true
        });
    }
    catch(error){
        console.log("Error fetching company by id:", error);
        return res.status(500).json({
            message:"Error fetching company",
            success:false
        });
    }
}

export const updatecompany = async(req,res)=>{
    try{ 
        const {name,description,website,location} = req.body;
        const file = req.file; //logo file

        const updatedata = {};
        if (typeof name === "string" && name.trim()) updatedata.name = name.trim();
        if (typeof description === "string") updatedata.description = description;
        if (typeof website === "string") updatedata.website = website;
        if (typeof location === "string") updatedata.location = location;

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "image",
            });
            updatedata.logo = cloudResponse.secure_url;
        }

        const userId = req.userId ?? req.id;
        const company = await Company.findOneAndUpdate(
            { _id: req.params.id, userId },
            updatedata,
            { new: true }
        );

        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            });
           
        }  
         return res.status(200).json({
                message:"Company updated successfully",
                company:company,
                success:true
            });
       }
    catch(error){
        console.log("Error updating company:", error);
        return res.status(500).json({
            message:"Error updating company",
            success:false
        });
    }
}
