
import { job as Job } from '../models/job_model.js';

export const postJob = async(req,res)=>{
    try{
        const {title, description, requirements, location, salary, jobtype, experience, position, companyId} = req.body;
        const userid=req.id;

        if(!title || !description || !requirements || !location || !salary || !jobtype || !experience || !position || !companyId){
            return res.status(400).json({
                message:"Something is missing .All fields are required",
                success:false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(',').map(req=>req.trim()),
            location,
            salary,
            jobtype,
            experience,
            position,
            company:companyId,
            created_by:userid,
            application: []
        })

        return res.status(201).json({
            message:"Job posted successfully",
            job:job,
            success:true
        }); 
    }
    catch(error){
        console.log("Error posting job:", error);
        return res.status(500).json({
            message:"Error posting job",
            success:false
        });
    }
}

export const getalljobs = async(req,res)=>{
    try{
        const keyword = req.query.keyword || "";
        const querey ={
            $or:[
                {title:{$regex:keyword,$options:'i'}},
                {description:{$regex:keyword,$options:'i'}},
            ]
        };
        const jobs = await Job.find(querey).populate({ path: "company", select: "name logo" });
        return res.status(200).json({
            jobs: jobs || [],
            success:true,
            message: jobs && jobs.length ? undefined : "No jobs found"
        })
    }
    catch(error){
        console.log("Error fetching jobs:", error);
        return res.status(500).json({
            message:"Error fetching jobs",
            success:false
        });
    }
}

export const getjobbyid = async(req,res)=>{
    try{
        const jobid = req.params.id;
        const job = await Job.findById(jobid)
            .populate({ path: "company", select: "name logo" })
            .populate({
                path: "application",
                select: "applicant status createdAt",
                populate: { path: "applicant", select: "_id" },
            });
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    }
    catch(error){
        console.log("Error fetching job by id:", error);
        return res.status(500).json({
            message:"Error fetching job",
            success:false
        });
    }
}

export const getAdminjobs = async(req,res)=>{
    try{
        const adminid =req.id;
        const jobs = await Job.find({created_by:adminid}).populate({ path: "company", select: "name logo" });
        return res.status(200).json({
            jobs: jobs || [],
            success:true,
            message: jobs && jobs.length ? undefined : "No jobs found for this admin"
        });
    }
    catch(error){
        console.log("Error fetching admin jobs:", error);
        return res.status(500).json({
            message:"Error fetching admin jobs",
            success:false
        });
    }
}
