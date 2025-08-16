import React from 'react'
import about from '../assets/about.jpg'
import video from '../assets/video.mp4'
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BsFillPatchCheckFill } from "react-icons/bs";

function About() {
    return (
        <div className='w-[100vw] lg:h-[70vh] min-h-[50vh] flex flex-wrap items-center justify-center gap-2 mb-[30px]'>
        {/* for image */}
        <div className='lg:w-[40%] md:w-[80%] w-[100%] h-[100%] flex items-center justify-center relative'>
            <img src={about} alt="" className='w-[80%] h-[90%] rounded-lg' />
            <div className='max-w-[350px] mx-auto p-4 absolute top-[55%] left-[50%]'>
            <video src={video} className='w-full rounded-xl shadow-lg border-2 border-white' controls autoPlay loop />
            </div>
        </div>
        {/* for about info */}
<div className='lg:w-[50%] md:w-[70%] w-[100%] h-[100%] flex flex-col items-start justify-center px-[35px] md:px-[80px] gap-6'>

    {/* About Us */}
    <div className='flex items-center text-[18px] font-medium'>
        About Us 
        <TfiLayoutLineSolid className='w-[40px] h-[2px] ml-3'/>
    </div>

    {/* Heading */}
    <div className='md:text-[45px] text-[35px] font-semibold leading-tight'>
        We Are Maximize Your Learning Growth
    </div>

    {/* Paragraph */}
    <p className='text-gray-600'>
        We provide a modern Learning Management System to simplify online education, track progress, 
        and enhance student-instructor collaboration efficiently.
    </p>
             {/* Features in grid */}
            <div className='grid grid-cols-2 gap-y-6 gap-x-10 mt-6'>
                <div className='flex items-center gap-2'>
                <BsFillPatchCheckFill className='w-[20px] h-[20px] text-blue-600'/>
                Simplified Learning
                </div>
                <div className='flex items-center gap-2'>
                <BsFillPatchCheckFill className='w-[20px] h-[20px] text-blue-600'/>
                Expert Trainers
                </div>
                <div className='flex items-center gap-2'>
                <BsFillPatchCheckFill className='w-[20px] h-[20px] text-blue-600'/>
                Big Experience
                </div>
                <div className='flex items-center gap-2'>
                <BsFillPatchCheckFill className='w-[20px] h-[20px] text-blue-600'/>
                Lifetime Access
                </div>
            </div>
        </div>
    </div>
    )
}

export default About
