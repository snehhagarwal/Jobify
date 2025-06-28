import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, ClipboardList, MapPin } from "lucide-react";
import Navbar from "./shared/NavBar";
import { useParams } from "react-router-dom";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { allAppliedJobs } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  useEffect(() => {
    setIsApplied(allAppliedJobs.some((job) => job.job._id === jobId));
  }, [allAppliedJobs]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); //update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); //helps us to real time ui update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4682B4]/5 to-[#F8FAFC]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#4682B4]/20">
          <div className="p-8 bg-gradient-to-r from-[#4682B4]/10 to-[#3a6d99]/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="font-bold text-2xl text-black">
                  {singleJob?.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <Badge className="bg-white/90 text-[#2a4f6e] font-medium px-3 py-1 border border-white hover:bg-white transition-colors">
                    {singleJob?.position} Positions
                  </Badge>
                  <Badge className="bg-[#4682B4]/20 text-white font-medium px-3 py-1 border border-white/30 hover:bg-[#4682B4]/30 transition-colors">
                    {singleJob?.jobType}
                  </Badge>
                  <Badge className="bg-green-50 text-green-700 font-medium px-3 py-1 border border-green-200 hover:bg-green-100 transition-colors">
                    {singleJob?.salary} LPA
                  </Badge>
                </div>
              </div>
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`rounded-lg px-6 py-2.5 text-sm font-medium transition-all ${
                  isApplied
                    ? "bg-gray-100 text-gray-600 border border-gray-300 cursor-not-allowed"
                    : "bg-white text-[#4682B4] hover:bg-white/90 shadow-md hover:shadow-lg"
                }`}
              >
                {isApplied ? "✓ Already Applied" : "Apply Now"}
              </Button>
            </div>
          </div>

          <div className="p-8 bg-white">
            <h1 className="border-b-2 border-b-[#4682B4]/20 font-semibold text-lg text-[#2a4f6e] pb-3 mb-6 flex items-center">
              <ClipboardList className="w-5 h-5 mr-2 text-[#4682B4]" />
              Job Description
            </h1>

            <div className="space-y-4 text-gray-700">
              <div className="flex">
                <span className="font-semibold text-[#2a4f6e] min-w-[140px]">
                  Role:
                </span>
                <span>{singleJob?.title}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-[#2a4f6e] min-w-[140px]">
                  Location:
                </span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-[#4682B4]" />
                  {singleJob?.location}
                </span>
              </div>
              <div className="flex">
                <span className="font-semibold text-[#2a4f6e] min-w-[140px]">
                  Description:
                </span>
                <span>{singleJob?.description}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-[#2a4f6e] min-w-[140px]">
                  Experience:
                </span>
                <span>{singleJob?.experienceLevel} years</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-[#2a4f6e] min-w-[140px]">
                  Salary:
                </span>
                <span>{singleJob?.salary} LPA</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-[#2a4f6e] min-w-[140px]">
                  Total Applicants:
                </span>
                <span>{singleJob?.applications?.length}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-[#2a4f6e] min-w-[140px]">
                  Posted Date:
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-[#4682B4]" />
                  {singleJob?.createdAt.split("T")[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
