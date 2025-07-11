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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input,setInput]=useState({
    email:"",
    password:"",
    role:"",
  });
  
  const {loading,user}=useSelector(store=>store.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  const changedValue=(e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res=await axios.post(`${USER_API_END_POINT}/login`,input,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      if(res.data.success){
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error); 
      toast.error(error.response.data.message)
    }  
    finally{
      dispatch(setLoading(false));
    }      
  }

  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 py-12">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-1/2 bg-white rounded-lg p-8 shadow-sm border border-gray-200">          <h1 className="font-bold text-3xl mb-6 text-[#4682B4] text-center">Welcome Back</h1>
          
          <div className="my-4">
            <Label className="text-slate-700 font-medium">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changedValue}
              placeholder="Enter your Email"
              className="border-slate-300 focus:border-[#4682B4] focus:ring-2 focus:ring-[#4682B4]/30 mt-1 py-2 px-4 rounded-lg transition-all duration-200"
            />
          </div>
          
          <div className="my-4">
            <Label className="text-slate-700 font-medium">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changedValue}
              placeholder="Enter your password"
              className="border-slate-300 focus:border-[#4682B4] focus:ring-2 focus:ring-[#4682B4]/30 mt-1 py-2 px-4 rounded-lg transition-all duration-200"
            />
          </div>
          
          <div className="my-5">
            <Label className="text-slate-700 font-medium mb-3 block">Login as</Label>
            <RadioGroup className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role==='student'}
                  onChange={changedValue}
                  className="h-5 w-5 cursor-pointer text-[#4682B4] border-slate-300 
                  rounded-full checked:border-[#4682B4] focus:ring-[#4682B4] transition-all"
                />
                <Label htmlFor="r1" className="text-slate-700 cursor-pointer hover:text-[#4682B4] transition-colors">
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
                  className="h-5 w-5 cursor-pointer text-[#4682B4] border-slate-300 
                  rounded-full checked:border-[#4682B4] focus:ring-[#4682B4] transition-all"
                />
                <Label htmlFor="r2" className="text-slate-700 cursor-pointer hover:text-[#4682B4] transition-colors">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {loading ? (
            <Button className="w-full my-4 bg-[#4682B4] hover:bg-[#3a6d99] text-white py-2 px-4 rounded-lg transition-all duration-300 shadow hover:shadow-md">
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="w-full my-4 bg-[#4682B4] hover:bg-[#3a6d99] text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow hover:shadow-md"
            >
              Login
            </Button>
          )}
          
          <div className="text-center mt-4">
            <span className="text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#4682B4] hover:text-[#3a6d99] font-medium underline underline-offset-4 hover:underline-offset-2 transition-all"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;