import React, { useState } from 'react'
import Navbar from '../shared/NavBar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-[#f5f9fc]">
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-8'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl text-[#4682B4]'>Your Company Name</h1>
                    <p className='text-gray-600'>What would you like to give your company name</p>
                </div>

                <Label className="text-gray-700">Company Name</Label>
                <Input
                    type="text"
                    className='my-2 focus:border-[#4682B4] focus:ring-[#4682B4]'
                    placeholder="Enter your company name"
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button 
                        variant="outline" 
                        onClick={() => navigate("/admin/companies")}
                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={registerNewCompany}
                        className="bg-[#4682B4] hover:bg-[#3a6d99] text-white"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate