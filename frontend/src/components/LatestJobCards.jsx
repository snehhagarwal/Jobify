import React from 'react'
import { Badge } from './ui/badge'
import { MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='p-6 rounded-lg shadow-sm bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:scale-[1.02]'>
      <div className='mb-3'>
        <h1 className='font-semibold text-lg text-blue-900 group-hover:text-blue-800'>{job?.company?.name}</h1>
        <p className='text-sm text-blue-600 flex items-center gap-1'>
          <MapPin className='h-4 w-4 opacity-80' /> 
          <span className='group-hover:text-blue-700'>{job?.company?.location}</span>
        </p>
      </div>

      <div className='mb-4'>
        <h1 className='font-bold text-xl text-gray-800 mb-1 group-hover:text-gray-900'>{job?.title}</h1>
        <p className='text-sm text-gray-600 line-clamp-2 group-hover:text-gray-700'>
          {job?.description}
        </p>
      </div>

      <div className='flex flex-wrap items-center gap-2 mt-4'>
        <Badge className="bg-white text-blue-700 font-medium px-3 py-1 border border-blue-200 shadow-xs group-hover:shadow-sm hover:bg-blue-50 min-w-[100px] text-center">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-white text-blue-700 font-medium px-3 py-1 border border-blue-200 shadow-xs group-hover:shadow-sm hover:bg-blue-50 min-w-[100px] text-center">
          {job.jobType}
        </Badge>
        <Badge className="bg-white text-green-700 font-medium px-3 py-1 border border-green-200 shadow-xs group-hover:shadow-sm hover:bg-green-50 min-w-[100px] text-center">
          {job.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards