//  "use client"
import { dummyInterviews } from '@/constant'
import InterviewCard from './InterviewCard'
import Image from 'next/image'
import Link from 'next/link'
// import { useSession } from 'next-auth/react'
// import { useEffect, useState } from 'react'
// import { getInterviewByUser } from '@/lib/actions/interview'
 
 const InterviewPage = () => {
     
    // const [error, setError] = useState('')
    // const session = useSession()
    // const [loading, setLoading] = useState(false)
    //  const [interview, setInterview] = useState([])
     
    //  useEffect(() => {

    //      const fetchAllInterviews = async () => {
    //       if (session?.user?.id) {
    //         try {
    //           const userId = session.user.id

    //           setLoading(true)

    //           const fetchedInterviews = await getInterviewByUser(userId)

    //           setInterview(fetchedInterviews)

    //         } catch (err) {
    //           console.error("Error fetching interviews:", err)
    //           setError("Failed to load events.")
    //         } finally {
    //           setLoading(false)
    //         }
    //       }
    //     }

    //     if (session?.user?.id) {
    //        fetchAllInterviews()
    //      }
    //   }, [session])

    //   console.log(interview)
     
   return (
     <>
      <section className='card-cta max-lg:flex-col max-lg:gap-20'>
         <div className='flex flex-col gap-6 max-w-lg'>
         <h2> 
           Get Interview-Ready with AI-Powered Practice & Feedback
         </h2>
          <p>Practice on real interview questions & get instant feedback</p>
           
          <button className='btn-primary max-sm:w-full'>
             <Link href='/interview'>
              Start an Interview
             </Link>
           </button>
         </div>
          
            <Image  src="/robot.png" alt='robotnic' width={400} height={400}/>
      </section>

       <section className='flex flex-col gap-6 mt-6'>
           <h2>
             Your Interview
           </h2>
            
            <div className='interview-section'>
                {/* <p>You havent&apos;t taken any interview yet</p> */}
                 <div className="gap-5 grid xl:gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                 {dummyInterviews.map((interview) => (
                   <InterviewCard {...interview} key={interview.id} interviewId={interview.id}/>
                 ))}
                 </div>
            </div>
       </section>
        
        <section className='flex flex-col gap-6 mt-6'>
           <h2>Take an Interview</h2>
            <div className='gap-5 grid xl:gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
           {dummyInterviews.map((interview) => (
                   <InterviewCard {...interview} key={interview.id}/>
                 ))}
                 </div>
       {/* <p>There are no interviews available</p> */}
        </section>
     </>
   )
 }
 
 export default InterviewPage