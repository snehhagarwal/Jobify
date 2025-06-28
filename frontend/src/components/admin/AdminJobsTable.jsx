import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
  const {allAdminJobs,searchJobByText}=useSelector(store=>store.job)
  const [filterJobs,setFilterJobs]=useState(allAdminJobs);
  const navigate=useNavigate();

  useEffect(()=>{
    const filteredJobs=allAdminJobs.length >= 0 && allAdminJobs.filter((job)=>{
        if(!searchJobByText){
            return true
        }
        return job?.title.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
    });
    setFilterJobs(filteredJobs)
  },[allAdminJobs,searchJobByText])
  return (
    <div>
      <Table className="border-collapse w-full">
        <TableCaption className="text-gray-500 mb-4">A list of your recently posted jobs</TableCaption>
        <TableHeader className="bg-[#4682B4]">
            <TableRow className="hover:bg-[#4682B4]">
                <TableHead className="text-white font-medium px-4 py-3 text-left">Company Name</TableHead>
                <TableHead className="text-white font-medium px-4 py-3 text-left">Role</TableHead>
                <TableHead className="text-white font-medium px-4 py-3 text-left">Date</TableHead>
                <TableHead className="text-white font-medium px-4 py-3 text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                filterJobs?.map((job)=>(
                <TableRow className="hover:bg-[#4682B4]/10 even:bg-gray-50 border-b border-[#4682B4]/20">
                <TableCell className="px-4 py-3 font-medium">{job?.company?.name}</TableCell>
                <TableCell className="px-4 py-3 font-medium">{job?.title}</TableCell>
                <TableCell className="px-4 py-3 text-gray-600">{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="px-4 py-3 text-right">
                    <Popover>
                        <PopoverTrigger className="p-1 hover:bg-gray-200 rounded-md ml-auto inline-flex">
                            <MoreHorizontal className="h-5 w-5 text-[#4682B4]"/>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 p-2">
                            {/* <div onClick={()=>navigate(`/admin/jobs/${job._id}`)}className='flex items-center gap-2 w-full cursor-pointer text-[#4682B4] hover:bg-[#4682B4]/10 p-2 rounded'>
                               <Edit2 className="h-4 w-4"/>
                               <span className="text-sm">Edit</span>
                            </div> */}
                            <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2 text-[#4682B4] hover:bg-[#4682B4]/10 p-2 rounded'>
                              <Eye className='h-4 w-4'/>
                              <span className='text-sm'>Applicants</span>
                            </div>
                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableRow>
            ))
            }  
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable