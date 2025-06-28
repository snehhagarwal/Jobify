import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job)

  return (
    <div className="border border-[#4682B4]/20 rounded-lg overflow-hidden">
      <Table>
        <TableCaption className="text-[#4682B4]/80 bg-[#F8FAFC] py-2">A list of your applied jobs</TableCaption>
        <TableHeader className="bg-[#4682B4]/10">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-[#2a4f6e] font-medium">Date</TableHead>
            <TableHead className="text-[#2a4f6e] font-medium">Job Role</TableHead>
            <TableHead className="text-[#2a4f6e] font-medium">Company</TableHead>
            <TableHead className="text-right text-[#2a4f6e] font-medium">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs?.map((appliedJob) => (
              <TableRow 
                key={appliedJob?._id} 
                className="border-[#4682B4]/10 hover:bg-[#4682B4]/05 transition-colors"
              >
                <TableCell className="text-gray-700">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-gray-700">{appliedJob?.job?.title}</TableCell>
                <TableCell className="text-gray-700">{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge 
                    className={`border border-[#4682B4]/20 hover:bg-opacity-80 ${
                      appliedJob?.status?.toLowerCase() === 'rejected' 
                        ? 'bg-red-400 text-white' 
                        : appliedJob?.status?.toLowerCase() === 'pending' 
                          ? 'bg-gray-400 text-white' 
                          : 'bg-green-400 text-white'
                    }`}
                  >
                    {appliedJob?.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable