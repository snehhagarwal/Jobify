import React, { useState } from "react";
import Navbar from "./shared/NavBar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileData from "./UpdateProfileData";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills=["html","css","js","java","python"];
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-[#4682B4]/20 rounded-2xl shadow-sm p-8 mt-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-[#4682B4]/30">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-semibold text-xl text-[#2a4f6e]">
                {user?.fullname}
              </h1>
              <p className="text-gray-600">{user?.profile.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right border-[#4682B4] text-[#4682B4] hover:bg-[#4682B4]/10"
            variant="outline"
          >
            <Pen className="w-4 h-4" />
          </Button>
        </div>

        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-[#4682B4]" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="w-5 h-5 text-[#4682B4]" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-6">
          <h1 className="font-semibold text-[#2a4f6e] mb-2">Skills</h1>
          <div className="flex flex-wrap items-center gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-[#4682B4]/10 text-[#2a4f6e] border border-[#4682B4]/20 hover:bg-[#4682B4]/20"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Label className="font-semibold text-[#2a4f6e]">Resume</Label>
          <div className="mt-1">
            {isResume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="text-[#4682B4] hover:underline hover:text-[#3a6d99] transition-colors"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white border border-[#4682B4]/20 rounded-2xl shadow-sm p-6 mt-6 mb-10">
        <h1 className="font-semibold text-xl text-[#2a4f6e] mb-4">
          All Applied Jobs
        </h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileData open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
