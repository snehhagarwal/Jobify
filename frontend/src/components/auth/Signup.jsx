import React, { useEffect, useState } from "react";
import Navbar from "../shared/NavBar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input,setInput]=useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  });

  const dispatch=useDispatch();
  const {loading,user}=useSelector(store=>store.auth);
  const navigate=useNavigate();

  const changedValue=(e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }

  const changedFile=(e)=>{
    setInput({...input,file:e.target.files?.[0]})
  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file){
      formData.append("file",input.file); 
    }
    try {
      dispatch(setLoading(true));
      const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          'Content-Type':"multipart/form-data"
        },
        withCredentials:true,
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error); 
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false));
    }      
  }

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[])

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 py-8">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 bg-white rounded-lg p-8 shadow-sm border border-gray-200"
        >
          <h1 className="font-bold text-3xl mb-6 text-[#4682B4] text-center">Create Account</h1>
          
          <div className="my-4">
            <Label className="text-gray-700 font-medium">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changedValue}
              placeholder="Enter your Full Name"
              className="border-gray-300 focus:border-[#4682B4] focus:ring-2 focus:ring-[#4682B4]/30 mt-1 py-2 px-4 rounded-lg bg-gray-50"
            />
          </div>
          
          <div className="my-4">
            <Label className="text-gray-700 font-medium">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changedValue}
              placeholder="Enter your Email"
              className="border-gray-300 focus:border-[#4682B4] focus:ring-2 focus:ring-[#4682B4]/30 mt-1 py-2 px-4 rounded-lg bg-gray-50"
            />
          </div>
          
          <div className="my-4">
            <Label className="text-gray-700 font-medium">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changedValue}
              placeholder="Enter your Phone Number"
              className="border-gray-300 focus:border-[#4682B4] focus:ring-2 focus:ring-[#4682B4]/30 mt-1 py-2 px-4 rounded-lg bg-gray-50"
            />
          </div>
          
          <div className="my-4">
            <Label className="text-gray-700 font-medium">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changedValue}
              placeholder="Enter your password"
              className="border-gray-300 focus:border-[#4682B4] focus:ring-2 focus:ring-[#4682B4]/30 mt-1 py-2 px-4 rounded-lg bg-gray-50"
            />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-5">
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">Register as</Label>
              <RadioGroup className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role==='student'}
                    onChange={changedValue}
                    className="h-5 w-5 cursor-pointer text-[#4682B4] border-gray-300 rounded-full checked:border-[#4682B4] focus:ring-[#4682B4]"
                  />
                  <Label htmlFor="r1" className="text-gray-700 cursor-pointer hover:text-[#4682B4] transition-colors">
                    Student
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role==='recruiter'}
                    onChange={changedValue}
                    className="h-5 w-5 cursor-pointer text-[#4682B4] border-gray-300 rounded-full checked:border-[#4682B4] focus:ring-[#4682B4]"
                  />
                  <Label htmlFor="r2" className="text-gray-700 cursor-pointer hover:text-[#4682B4] transition-colors">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex-1">
              <Label className="text-gray-700 font-medium block mb-2">Profile Picture</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changedFile}
                className="cursor-pointer file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 file:border file:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4682B4] focus:ring-offset-1 h-10 w-full"
              />
            </div>
          </div>
          
          {loading ? (
            <Button className="w-full my-4 bg-[#4682B4] hover:bg-[#3a6d99] text-white py-2 px-4 rounded-lg transition-colors">
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="w-full my-4 bg-[#4682B4] hover:bg-[#3a6d99] text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Sign Up
            </Button>
          )}
          
          <div className="text-center mt-3">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#4682B4] hover:text-[#3a6d99] font-medium underline underline-offset-4 hover:underline-offset-2 transition-colors"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;