import Agent from "./Agent"
import DisplayTechIcon from "./DisplayTechIcon"
import { getRandomInterviewCover } from "@/lib/utils"
import Image from 'next/image'

 const InterviewPage =  ({interview, id}) => {
     
         
    return (
       <>
         <div className='flex flex-row gap-4 justify-between'>
            <div className='flex flex-row gap-4 items-center max-sm:flex-col'>
            <div className='flex flex-row gap-4 items-center'>
           <Image src={getRandomInterviewCover()} alt='cover-image' width={40} height={40} className='rounded-full object-cover size-[40px]'/>
            <h3 className='capitalize'>{interview.role}</h3>
             </div>
            {/* <DisplayTechIcon techStack={interview.techstack}/> */}
            </div>
           <p className='bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize'>{interview.type}</p>
         </div>
          <Agent interviewId={id} type='interview' questions={interview?.questions}/>
      </>
  )
}

export default InterviewPage