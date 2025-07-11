import React, { useEffect, useState } from 'react'
import Navbar from '../shared/NavBar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
  const params=useParams();
  useGetCompanyById(params.id);
  const [input,setInput]=useState({
    name:"",
    description:"",
    website:"",
    location:"",
    file:null
  });

  const {singleCompany}=useSelector(store=>store.company);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  const changeEventHandler=(e)=>{
      setInput({...input,[e.target.name]:e.target.value})
  }

  const changeFileHandler=(e)=>{
    const file=e.target.files?.[0]
    setInput({...input,file})
  } 

  const submitHandler=async(e)=>{
      e.preventDefault();
      const formData=new FormData();
      formData.append("name",input.name)
      formData.append("description",input.description)
      formData.append("website",input.website)
      formData.append("location",input.location)
      if(input.file){
        formData.append("file",input.file)
      }
      try {
        setLoading(true)
        const res=await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,formData,{
          headers:{
            'Content-Type':'multipart/form-data'
          },
          withCredentials:true,
        });
        if(res.data.success){
          toast.success(res.data.message)
          navigate("/admin/companies")
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
      }finally{
        setLoading(false)
      }
  }

  useEffect(()=>{
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null
    })
  },[singleCompany]);

  return (
    <div className="min-h-screen bg-[#f5f9fc]">
      <Navbar/>
      <div className='max-w-xl mx-auto py-8 px-4'>
          <form onSubmit={submitHandler} className="bg-gradient-to-br from-[#f0f7fc] to-[#e6f2ff] rounded-xl shadow-md border border-[#4682B4]/30 p-6">
            <div className='flex items-center gap-4 pb-6 border-b border-[#4682B4]/20'>
              <Button 
                onClick={()=>navigate("/admin/companies")} 
                variant="outline" 
                className='flex items-center gap-2 text-[#4682B4] hover:text-white hover:bg-[#4682B4] border-[#4682B4]/50 hover:border-[#4682B4]'
              >
                <ArrowLeft className="h-4 w-4"/>
                <span>Back</span>
              </Button>
              <h1 className='font-bold text-xl text-[#2a5885]'>Company Setup</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>
              <div className="space-y-1">
                 <Label className="text-[#2a5885] font-medium">Company Name</Label>
                 <Input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={changeEventHandler}
                    className="bg-white/90 focus:border-[#4682B4] focus:ring-[#4682B4] border-[#4682B4]/30"
                 />
              </div>
              <div className="space-y-1">
                 <Label className="text-[#2a5885] font-medium">Description</Label>
                 <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    className="bg-white/90 focus:border-[#4682B4] focus:ring-[#4682B4] border-[#4682B4]/30"
                 />
              </div>
              <div className="space-y-1">
                 <Label className="text-[#2a5885] font-medium">Website</Label>
                 <Input
                    type="text"
                    name="website"
                    value={input.website}
                    onChange={changeEventHandler}
                    className="bg-white/90 focus:border-[#4682B4] focus:ring-[#4682B4] border-[#4682B4]/30"
                 />
              </div>
              <div className="space-y-1">
                 <Label className="text-[#2a5885] font-medium">Location</Label>
                 <Input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    className="bg-white/90 focus:border-[#4682B4] focus:ring-[#4682B4] border-[#4682B4]/30"
                 />
              </div>
              <div className="space-y-1 md:col-span-2">
                 <Label className="text-[#2a5885] font-medium">Logo</Label>
                 <Input
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="bg-white/90 file:text-[#4682B4] file:border-[#4682B4]/30 file:hover:bg-[#4682B4]/10 file:bg-white file:rounded file:px-4 file:py-2 file:mr-4 border-[#4682B4]/30"
                 />
              </div>
            </div>
            {
              loading ? (
                <Button className="w-full mt-6 bg-[#4682B4]/90 hover:bg-[#4682B4] cursor-not-allowed shadow-md">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-white"/>
                  <span className="text-white">Updating...</span>
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="w-full mt-6 bg-[#4682B4] hover:bg-[#3a6d99] text-white shadow-md hover:shadow-lg transition-all"
                >
                  Update Company
                </Button>
              )
            }
          </form>
      </div>
    </div>
  )
}

export default CompanySetup