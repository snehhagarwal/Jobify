import { Job } from "../models/job.model.js";

export const postJob=async(req,res)=>{
    try{
       const{title,description,requirements,location,salary,jobType,experience,position,companyId}=req.body;
       const userId=req.id;
       if(!title || !description || !location || !salary || !jobType || !position || !companyId || !requirements || !experience){
           return res.status(400).json({
               message:"Please Fill All Fields",
               success:false,
           })
       }

       const job=await Job.create({
              title,
              description,
              requirements: requirements.split(","),
              location,
              salary:Number(salary),
              jobType,
              experienceLevel:experience,
              position,
              company:companyId,
              createdBy:userId,
       })

       return res.status(201).json({
        message:"Job Posted Successfully",
        job,
        success:true,
       })
    }
    catch(error){
        console.log(error);        
    }
};

//student
export const getAllJobs=async(req,res)=>{
    try{
        const keyword=req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}}, // case insensitive search
                {description:{$regex:keyword,$options:"i"}},
            ]
        }
        const jobs=await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1}); //sort by latest job first
        if(!jobs){
            return res.status(404).json({
                message:"No Jobs Found",
                success:false,
            })
        }

        return res.status(200).json({
            jobs,
            success:true,
        })
    }
    catch(error){
        console.log(error);
        
    }
}

//student
export const getJobById=async(req,res)=>{
    try{
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"applications",
        });
        if(!job){
            return res.status(404).json({
                message:"Job Not Found",
                success:false,
            })
        };
        return res.status(200).json({
            message:"Job Found Successfully",
            job,
            success:true,
        })
    }
    catch(error){
        console.log(error);
    }
}

//admin has created how many jobs till now
export const getAdminJobs=async(req,res)=>{
    try {
        const adminId=req.id;
        const jobs= await Job.find({createdBy:adminId}).populate({
            path:'company',
            createdAt:-1
        });
        if(!jobs){
            return res.status(200).json({
                message:"No Jobs Posted Yet",
                success:false,
            })
        }
        return res.status(200).json({
            message:"Jobs Fetched Successfully",
            jobs,
            success:true,
        })
    } catch (error) {
        console.log(error);
        
    }
}
