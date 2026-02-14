import {Application} from'../models/application_model.js';
import { job } from '../models/job_model.js';
import {user} from'../models/user_model.js';

export const applyjob=async(req,res)=>{
    try{
        const userid = req.id;
        const jobId = req.params.id ; 

        if(!jobId){
            return res.status(400).json({
                message:"Job ID is required",
                success:false
            });
        }
            // check if user has already applied for the job 

            const exitsingapplication = await Application.findOne({job: jobId , applicant : userid})

            if(exitsingapplication){
                return res.status(400).json({
                    message:"You have already applied for this job",
                    success:false
                });
            }
            const jobb = await job.findById(jobId);
            if(!jobb){
                return res.status(404).json({
                    message:"Job not found",
                    success:false
                });
            }

            const newapplication = await Application.create({
                job:jobId,
                applicant:userid
            }); 

            jobb.application.push(newapplication._id);
            await jobb.save();

            return res.status(201).json({
                message:"Job applied successfully",
                application:newapplication,
                success:true
            });
    }
    catch(error){
        console.log("Error applying job:", error);
        return res.status(500).json({
            message:"Error applying job",
            success:false
        });
    }
}

export const getappliedjobs= async(req,res)=>{
    try{
        const userid= req.id;
        const applications = await Application.find({ applicant: userid })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                select: "title position company",
                populate: { path: "company", select: "name logo" }
            });

        return res.status(200).json({
            applications: applications || [],
            success: true,
            message: applications && applications.length ? undefined : "No applied jobs found"
        });
    }
    catch(error){
        console.log("Error fetching applied jobs:", error);
        return res.status(500).json({
            message:"Error fetching applied jobs",
            success:false
        });
    }
}

export const getapplications = async(req,res)=>{
    try{
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        const jobb = await job.findById(jobId).select("_id title company");
        if (!jobb) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        const applications = await Application.find({ job: jobId })
            .sort({ createdAt: -1 })
            .populate({
                path: "applicant",
                model: "user",
                select: "fullname email phoneNumber profile.resume profile.resumeOriginalName profile.profilePhoto"
            });

        return res.status(200).json({
            job: jobb,
            applications: applications || [],
            success: true
        });
    }
    catch(error){
        console.log("Error fetching applications:", error);
        return res.status(500).json({
            message: "Error fetching applications",
            success: false
        });
    }
}

export const updatestatus= async(req,res)=>{
    try{
        const {status} = req.body;

        const applicationId = req.params.id ; 

        if(!status){
            return res.status(400).json(
                {
                    message:"status is required ",
                    success:false
                }
            )
        }
        const application = await Application.findById(applicationId);

        if(!application){
            return res.status(404).json({
                message:"Application not found",
                success:false
            });
        }

        application.status = status;
        await application.save();
        return res.status(200).json({
            message:"Application status updated successfully",
            application,
            success:true
        });

    }
    catch(error){
     console.log("Error updating application status:", error);
     return res.status(500).json({
         message:"Error updating application status",
         success:false
     });
    }
}
