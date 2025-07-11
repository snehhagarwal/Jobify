import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const {companies,searchCompanyByText}=useSelector(store=>store.company);
  const [filterCompany,setFilterCompany]=useState(companies);
  const navigate=useNavigate();

  useEffect(()=>{
    const filteredCompany=companies.length >= 0 && companies.filter((company)=>{
        if(!searchCompanyByText){
            return true
        }
        return company?.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
    });
    setFilterCompany(filteredCompany)
  },[companies,searchCompanyByText])
  return (
    <div>
      <Table className="border-collapse w-full">
        <TableCaption className="text-gray-500 mb-4">A list of your recent registered companies</TableCaption>
        <TableHeader className="bg-[#4682B4]">
            <TableRow className="hover:bg-[#4682B4]">
                <TableHead className="text-white font-medium px-4 py-3 text-left">Logo</TableHead>
                <TableHead className="text-white font-medium px-4 py-3 text-left">Name</TableHead>
                <TableHead className="text-white font-medium px-4 py-3 text-left">Date</TableHead>
                <TableHead className="text-white font-medium px-4 py-3 text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                filterCompany?.map((company)=>(
                <TableRow className="hover:bg-[#4682B4]/10 even:bg-gray-50 border-b border-[#4682B4]/20">
                <TableCell className="px-4 py-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={company.logo}/>
                    </Avatar>
                </TableCell>
                <TableCell className="px-4 py-3 font-medium">{company.name}</TableCell>
                <TableCell className="px-4 py-3 text-gray-600">{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="px-4 py-3 text-right">
                    <Popover>
                        <PopoverTrigger className="p-1 hover:bg-gray-200 rounded-md ml-auto inline-flex">
                            <MoreHorizontal className="h-5 w-5 text-[#4682B4]"/>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 p-2">
                            <div onClick={()=>navigate(`/admin/companies/${company._id}`)}className='flex items-center gap-2 w-full cursor-pointer text-[#4682B4] hover:bg-[#4682B4]/10 p-2 rounded'>
                               <Edit2 className="h-4 w-4"/>
                               <span className="text-sm">Edit</span>
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

export default CompaniesTable