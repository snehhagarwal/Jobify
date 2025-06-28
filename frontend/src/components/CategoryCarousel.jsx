/* eslint-disable no-unused-vars */
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Software Engineer",
  "UI/UX Designer",
  "Machine Learning Engineer",
  "Mobile Developer",
  "DevOps Engineer",
];
const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()


  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="m-full max-w-xl mx-auto">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
              <Button
                onClick={()=>searchJobHandler(cat)}
                className="
    bg-[#4682B4] hover:bg-[#3a6d99] 
    text-white font-medium py-2 px-6 
    rounded-lg shadow-sm hover:shadow-md
    transition-all duration-200 
    transform hover:-translate-y-0.5
    border border-[#5a8fc1] hover:border-[#4a7aad]
    active:scale-95
  "
              >
                {cat}
              </Button>{" "}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="h-10 w-10 rounded-full bg-white border-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400 transition-all shadow-sm" />
        <CarouselNext className="h-10 w-10 rounded-full bg-white border-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400 transition-all shadow-sm" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
