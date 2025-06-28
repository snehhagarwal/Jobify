import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query,setQuery]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate()

   const searchJobHandler=()=>{
       dispatch(setSearchQuery(query));
       navigate("/browse");
   }

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-6 py-3 rounded-full bg-blue-50 text-blue-700 font-semibold text-lg shadow-sm border border-blue-100">
          Elevate your journey toward your next career opportunity
        </span>
        <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">
          Search, Apply &<br /> Get Your{" "}
          <span className="text-[#4682B4] dark:text-cyan-400">Dream Job</span>
        </h1>
        <p>Your dream job is just a click away</p>
        <div className="flex w-full md:w-[40%] shadow-sm border border-blue-200 bg-white hover:border-blue-300 transition-colors rounded-full items-center gap-2 px-4 py-2 mx-auto">
          <input
            type="text"
            placeholder="Find your dream job..."
            onChange={(e)=>setQuery(e.target.value)}
            className="outline-none border-none w-full text-blue-900 placeholder-blue-300"
          />
          <Button onClick={searchJobHandler} className="rounded-full bg-blue-600 hover:bg-blue-700 p-2 text-white transition-colors">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
