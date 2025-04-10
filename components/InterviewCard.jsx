import { getRandomInterviewCover } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DisplayTechIcon from './DisplayTechIcon'
import dayjs from 'dayjs'

const InterviewCard = ({
  interviewId,
    userId,
    role,
    type,
    techstack, 
    level,
    questions,
    finalized,
    createdAt,
}) => {

      const feedback = null

      const normalizedType = /mix/gi.test(type) ? 'Mixed' : type
      const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY')

  return (
    <div className='bg-gradient-to-b from-[#4B4D4F] to-[#4B4D4F33]  p-0.5 rounded-2xl w-fit w-[360px] max-sm:w-full min-h-96'>
        <div className='card-interview border-2 border-primary-200/50'>
      <div >
         <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg  bg-light-600 rounded-tr-sm'>
             <p className='badge-text'>{normalizedType}</p>  
         </div>
        <Image src={getRandomInterviewCover()} width={90} height={90} alt='cover' className='rounded-full object-fit'/>
         <h3 className='mt-5 capitalize '>{role} interview</h3>
          <div className='flex gap-5 mt-3 flex-row'>
       <div className='flex gap-2 flex-row'>
     <Image src='/calendar.svg' alt='calendar' width={22} height={22}/>
       <p>{formattedDate}</p>
       </div>
         <div className='flex flex-row gap-2 items-center'>
         <Image  src='/star.svg' alt='star' width={22} height={22}/>
         <p className='whitespace-nowrap'>{feedback?.totalScore || '--/100'}</p>
         </div>
          </div>
          <p className='line-clamp-2 mt-5'>
              {feedback?.finalAssetment || "You haven't taken the interview take it now and improve your skill "}
          </p>
         </div>
         
            <div className='flex flex-row justify-between items-center'>
          <DisplayTechIcon techStack={techstack}/>

           <button className='btn-primary'>
            <Link href={feedback ? `/interview/${id}/feedback`: `/interview/${interviewId}`}>
               {feedback ? 'Check Feedback' : 'View Interview'}
            </Link>
           </button>
         </div>
        </div>
        
    </div>
  )
}

export default InterviewCard