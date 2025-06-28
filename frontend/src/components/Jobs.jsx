import React, { useEffect, useState } from 'react'
import Navbar from './shared/NavBar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux';

const Jobs = () => {
  const { allJobs, searchQuery } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs)

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
               job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               job.location.toLowerCase().includes(searchQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchQuery])

  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-1/5'> {/* Changed from w-20% to w-1/5 */}
            <FilterCard/>
          </div>
          {
            filterJobs.length <= 0 ? (
              <div className='flex-1 flex items-center justify-center'>
                <span className='text-gray-500'>No jobs found</span>
              </div>
            ) : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {
                    filterJobs.map((job) => (
                      <div key={job?._id}>
                        <Job job={job}/>
                      </div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs