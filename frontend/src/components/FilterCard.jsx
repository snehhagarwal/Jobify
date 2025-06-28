import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        arrays: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Noida"]
    },
    {
        filterType: "Industry",
        arrays: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Science", "Graphic Designer", "Machine Learning Engineer", "Software Engineer"]
    },
    {
        filterType: "Salary",
        arrays: ["0-50K", "50K- 1L", "1L - 5L", "5L - 15L", "15L-25L"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch=useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchQuery(selectedValue))
    }, [selectedValue,dispatch]);

    return (
        <div className='w-full bg-[#F8FAFC] p-4 rounded-lg border border-[#4682B4]/20 shadow-sm'>
            <h1 className='font-bold text-lg text-[#2a4f6e] pb-2 border-b border-[#4682B4]/20'>
                Filter Jobs
            </h1>
            
            <RadioGroup value={selectedValue} onValueChange={changeHandler} className='mt-1 space-y-1'>
                {filterData.map((data, index) => (
                    <div className='pt-1 first:pt-0'>
                        <h1 className='font-semibold text-[#2a4f6e] mb-2'>{data.filterType}</h1>
                        <div className='space-y-2 pl-2'>
                            {data.arrays.map((item, idx) => {
                                const itemId = `r${index}-${idx}`;
                                return (
                                    <div className='flex items-center group'>
                                        <RadioGroupItem 
                                            value={item} 
                                            id={itemId}
                                            className='text-[#4682B4] border-[#4682B4]/50 group-hover:border-[#4682B4]'
                                        />
                                        <Label 
                                            htmlFor={itemId}
                                            className='ml-2 text-gray-700 group-hover:text-[#2a4f6e] cursor-pointer'
                                        >
                                            {item}
                                        </Label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}

export default FilterCard