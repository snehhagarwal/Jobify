import {User} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const register=async(req,res)=>{
    try{
        const {fullname,email,phoneNumber,password,role}=req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:'All fields are required',
                success:false
            });
        };

        const file=req.file;
        const fileUri=getDataUri(file)
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);

        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exists",
                success:false,
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
                
            }
        });
        return res.status(201).json({
            message:"Account Created Successfully",
            success:true,
        })
    }
    catch(error){
        console.log(error);
    }
};

export const login=async(req,res)=>{
    try{
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            res.status(400).json({
                message:"All fields are required",
                success:false
            })
        }
        let user=await User.findOne({email});
        if(!user){
            res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }
        const isPassword=await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        }
        if(role!=user.role){
            return res.status(400).json({
                message:"Role mismatch",
                success:false
            })
        };
        const tokenData={
            userId:user._id,   
        }      
        const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpOnly:true, secure: true,sameSite: "none"}).json({
            message: `Welcome Back ${user.fullname}`,
            user,
            success: true,
        });

    }
    catch(error){
        console.log(error); 
    }
}

// export const logout=async(req,res)=>{
//      try{
//         return res.status(200).cookie("token","",{maxAge:0}).json({
//             message:"Logged Out Successfully",
//             success:true,
//         })
//      }
//      catch(error){
//         console.log(error);
//      }
// }

export const logout = async (req, res) => {
  try {
    return res.status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "none"
      })
      .json({
        message: "Logged Out Successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile=async(req,res)=>{
    try{
        const{fullname,email,phoneNumber,bio,skills}=req.body;
        const file=req.file;

        //cloudinary
        const fileUri=getDataUri(file);
        const  cloudResponse=await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "auto"
            });
        console.log("response is reached",cloudResponse);
        

        let skillsArray;
        if(skills){
            skillsArray=skills.split(",");
        }
        const userId=req.id; //checking whether the user is login so after that only he/she can update the profile 
        let user= await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false,
            })
        }

        //updating data
        if(fullname) user.fullname=fullname;
        if(email) user.email=email; 
        if(phoneNumber) user.phoneNumber=phoneNumber;
        if(bio) user.profile.bio=bio;
        if(skillsArray) user.profile.skills=skillsArray;
 
        //resume comes here
        if(cloudResponse){
            user.profile.resume=cloudResponse.secure_url //save the cloudinary url
            user.profile.resumeOriginalName=file.originalname //saves the original file name
        }

        await user.save();
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:"Profile Updated Successfully",
            user,
            success:true,
        })
    }
    catch(error){
        console.log(error);
        
    }
}

