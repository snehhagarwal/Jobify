/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/NavBar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input,setInput]=useState("")
    const navigate = useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input))
    },[input])
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                        <Input
                            className="w-full sm:w-64 bg-gray-100 border-gray-300 focus:border-[#4682B4] focus:ring-[#4682B4]"
                            placeholder="Filter by name"
                            onChange={(e)=>setInput(e.target.value)}
                        />
                        <Button 
                            onClick={() => navigate("/admin/companies/create")}
                            className="bg-[#4682B4] hover:bg-[#3a6d99] text-white transition-colors"
                        >
                            New Company
                        </Button>
                    </div>
                    <div className="border border-[#4682B4]/20 rounded-lg overflow-hidden bg-[#f0f7fc]">
                        <div className="overflow-x-auto">
                            <CompaniesTable className="min-w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Companies