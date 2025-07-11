import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";

const shortlisting = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const [applicantsDetails, setApplicantsDetails] = useState(null);
  const params = useParams();

  const getApplicantsDetails = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/${params.id}/applicants/details`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setApplicantsDetails(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch applicants details"
      );
    }
  };

  useEffect(() => {
    if (params.id) {
      getApplicantsDetails();
    }
  }, [params.id]);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        getApplicantsDetails();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="border border-[#4682B4]/20 rounded-lg shadow-sm">
      <Table className="border-collapse w-full">
        <TableCaption className="text-[#4682B4] font-medium py-4">
          {applicantsDetails?.job?.title} - {applicantsDetails?.total}{" "}
          Applicants
        </TableCaption>
        <TableHeader className="bg-[#4682B4]/10">
          <TableRow className="hover:bg-[#4682B4]/15">
            <TableHead className="text-[#2a4f6e] font-semibold p-3">
              Name
            </TableHead>
            <TableHead className="text-[#2a4f6e] font-semibold p-3">
              Email
            </TableHead>
            <TableHead className="text-[#2a4f6e] font-semibold p-3">
              Contact
            </TableHead>
            <TableHead className="text-[#2a4f6e] font-semibold p-3">
              Resume
            </TableHead>
            <TableHead className="text-[#2a4f6e] font-semibold p-3">
              Date
            </TableHead>
            <TableHead className="text-[#2a4f6e] font-semibold p-3">
              Status
            </TableHead>
            <TableHead className="text-[#2a4f6e] font-semibold p-3 text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicantsDetails?.applications?.length > 0 ? (
            applicantsDetails.applications.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-[#4682B4]/5 border-b border-[#4682B4]/10"
              >
                <TableCell className="text-[#2a4f6e] p-3">
                  {item.name}
                </TableCell>
                <TableCell className="text-[#2a4f6e] p-3">
                  {item.email}
                </TableCell>
                <TableCell className="text-[#2a4f6e] p-3">
                  {item.phone}
                </TableCell>
                <TableCell className="text-[#2a4f6e] p-3">
                  {item.resume ? (
                    <a
                      className="text-[#4682B4] hover:text-[#3a6d99] hover:underline cursor-pointer"
                      href={item.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.resumeName}
                    </a>
                  ) : (
                    <span className="text-gray-400">NA</span>
                  )}
                </TableCell>
                <TableCell className="text-[#2a4f6e] p-3">
                  {new Date(item.appliedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-[#2a4f6e] p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      item.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : item.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status?.charAt(0).toUpperCase() +
                      item.status?.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="p-3 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <div className="inline-flex items-center justify-center p-1 rounded-full hover:bg-[#4682B4]/10">
                        <MoreHorizontal className="h-4 w-4 text-[#4682B4]" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2 border border-[#4682B4]/20 shadow-lg">
                      {shortlisting.map((status, index) => (
                        <div
                          onClick={() =>
                            statusHandler(status.toLowerCase(), item.id)
                          }
                          key={index}
                          className="flex items-center p-2 rounded hover:bg-[#4682B4]/10 cursor-pointer"
                        >
                          <span
                            className={
                              status === "Accepted"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {status}
                          </span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                No applicants found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
