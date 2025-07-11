import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate=useNavigate();
  const daysAgoFunction=(mongodbTime)=>{
    const createdAt=new Date(mongodbTime);
    const currentTime=new Date();
    const timeDifference=currentTime-createdAt;
    return Math.floor(timeDifference/(1000*24*60*60))
  }

  return (
    <div className="relative group h-full"> 
      <div className="absolute inset-0 bg-gradient-to-br from-[#4682B4]/10 to-[#4682B4]/20 rounded-lg opacity-100 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      
      <div className='p-6 rounded-lg bg-[#F8FAFC] border border-[#4682B4]/20 shadow-sm hover:shadow-lg hover:border-[#4682B4]/40 transition-all duration-300 group-hover:scale-[1.01] cursor-pointer transform-gpu relative overflow-hidden flex flex-col h-full'> {/* Added flex flex-col h-full */}
        <div className='flex items-center justify-between'>
          <p className='text-sm text-[#4682B4]'>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-[#4682B4] hover:bg-[#4682B4]/10 hover:text-[#2a4f6e] transition-colors"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>

        <div className='flex items-start gap-3 mt-3'>
          <Avatar className="h-10 w-10 border border-[#4682B4]/20 flex-shrink-0"> {/* Added flex-shrink-0 */}
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
          <div className="min-w-0"> {/* Added min-w-0 */}
            <h1 className='font-semibold text-[#2a4f6e] line-clamp-1'>{job?.company?.name}</h1> {/* Added line-clamp-1 */}
            <p className='text-sm text-[#4682B4] flex items-center gap-1'>
              <MapPin className='h-3.5 w-3.5' /> {job?.company?.location}
            </p>
          </div>
        </div>

        <div className='mt-4 flex-grow'> {/* Added flex-grow */}
          <h1 className='text-xl font-bold text-gray-800 group-hover:text-[#2a4f6e] line-clamp-1'>{job?.title}</h1> {/* Added line-clamp-1 */}
          <p className='text-sm text-gray-600 mt-2 line-clamp-2 group-hover:text-gray-700 h-[40px]'> {/* Added h-[40px] */}
            {job?.description}
          </p>
        </div>

        <div className='flex flex-wrap items-center gap-2 mt-5'>
          <Badge className="bg-blue-50/80 text-blue-700 font-medium px-3 py-1 border border-blue-200 hover:bg-blue-100/90 hover:border-blue-300 transition-colors">
            {job?.position} Positions
          </Badge>
          <Badge className="bg-[#4682B4]/10 text-[#2a4f6e] font-medium px-3 py-1 border border-[#4682B4]/20 hover:bg-[#4682B4]/20 transition-colors">
            {job?.jobType}
          </Badge>
          <Badge className="bg-green-50/80 text-green-700 font-medium px-3 py-1 border border-green-200 hover:bg-green-100/90 hover:border-green-300 transition-colors">
            {job?.salary} LPA
          </Badge>
        </div>

        <div className='flex items-center gap-3 mt-6'>
          <Button 
            onClick={()=>navigate(`/description/${job?._id}`)}
            variant="outline" 
            className="border-[#4682B4] text-[#4682B4] hover:bg-[#4682B4]/10 hover:text-[#2a4f6e] hover:border-[#4682B4]/80 transition-colors flex-1"
          >
            View Details
          </Button>
          <Button className="bg-[#4682B4] hover:bg-[#3a6d99] text-white shadow-sm hover:shadow-md transition-colors flex-1"> 
            Save For Later
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Job