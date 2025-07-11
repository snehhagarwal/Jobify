import React, { useState } from 'react'
import Navbar from '../shared/NavBar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input,setInput]=useState({
        title:"",
        description:"",
        requirements:"",
        salary:"",
        location:"",
        jobType:"",
        experience:"",
        position:0,
        companyId:""
    });

    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    
    const {companies}=useSelector(store=>store.company);
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const selectChangeHandler=(value)=>{
        const selectedCompany=companies.find((company)=> company.name.toLowerCase()==value)
        setInput({...input,companyId:selectedCompany._id})
    };

    const submitHandler=async(e)=>{
       e.preventDefault();
       try {
          setLoading(true);
          const res=await axios.post(`${JOB_API_END_POINT}/post`,input,{
            headers:{
              'Content-Type':'application/json'
            },
            withCredentials:true
          })
          if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/jobs");
          }
       } catch (error) {
        toast.error(error.response.data.message)
       }finally{
        setLoading(false)
       };       
    }

  return (
    <div className="min-h-screen bg-[#f5f9fc]">
      <Navbar/>
      <div className='flex items-center justify-center w-full py-8 px-4'>
        <form onSubmit={submitHandler} className='p-8 w-full max-w-4xl bg-[#f8fbfe] border border-[#4682B4]/20 shadow-lg rounded-lg'>
          <h2 className="text-2xl font-bold text-[#4682B4] mb-6 text-center">Post New Job</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className="space-y-1">
              <Label className="text-[#4682B4] font-medium">Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className='focus:ring-[#4682B4] border-[#4682B4]/30 bg-white'
              />
            </div>
            
            <div className="space-y-1">
              <Label className="text-[#4682B4] font-medium">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className='focus:ring-[#4682B4] border-[#4682B4]/30 bg-white'
              />
            </div>
            
            <div className="space-y-1">
              <Label className="text-[#4682B4] font-medium">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className='focus:ring-[#4682B4] border-[#4682B4]/30 bg-white'
              />
            </div>
            
            <div className="space-y-1">
              <Label className="text-[#4682B4] font-medium">Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className='focus:ring-[#4682B4] border-[#4682B4]/30 bg-white'
              />
            </div>
            
            <div className="space-y-1">
              <Label className="text-[#4682B4] font-medium">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className='focus:ring-[#4682B4] border-[#4682B4]/30 bg-white'
              />
            </div>
            
            <div className="space-y-1">
              <Label className="text-[#4682B4] font-medium">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className='focus:ring-[#4682B4] border-[#4682B4]/30 bg-white'
              />
            </div>
            
            <div className="space-y-1">
              <Label className="text-[#4682B4] font-medium">Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className='focus:ring-[#4682B4] border-[#4682B4]/30 bg-white'
              />
            </div>
            
            <div className="space-y-1">
              <Label className="text-[#4682B4] font-medium">No. of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className='focus:ring-[#4682B4] border-[#4682B4]/30 bg-white'
              />
            </div>
            
            {
              companies.length > 0 && (
                <div className="space-y-1 md:col-span-2">
                  <Label className="text-[#4682B4] font-medium">Company</Label>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full border-[#4682B4]/30 focus:ring-[#4682B4] bg-white">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent className="border-[#4682B4]/30 bg-white">
                      <SelectGroup>
                        {companies.map((company)=>{
                          return(
                            <SelectItem 
                              key={company._id} 
                              value={company?.name?.toLowerCase()}
                              className="hover:bg-[#4682B4]/10 focus:bg-[#4682B4]/10"
                            >
                              {company.name}
                            </SelectItem>
                          )
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )
            }
          </div>  
          
          {
            loading ? (
              <Button 
                disabled
                className="w-full mt-6 bg-[#4682B4] hover:bg-[#3a6d99] text-white shadow-md transition-colors"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting New Job...
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="w-full mt-6 bg-[#4682B4] hover:bg-[#3a6d99] text-white shadow-md hover:shadow-lg transition-all"
              >
                Post New Job
              </Button>
            )
          }
          
          {
            companies.length === 0 && (
              <p className='text-sm text-red-600 font-medium text-center my-3'>
                Please register a company first, before posting jobs
              </p>
            )
          }
        </form>
      </div>
    </div>
  )
}

export default PostJob