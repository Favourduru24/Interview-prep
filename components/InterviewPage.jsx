import { dummyInterviews } from '@/constant'
import InterviewCard from './InterviewCard'
import Image from 'next/image'
import Link from 'next/link'
import { getAllInterview } from '@/lib/actions/interview.actions'

const InterviewPage = async () => {

  const interviews = await getAllInterview()

  // console.log(interviews)

  const hasInterview = interviews?.length > 0

     
    // const [error, setError] = useState('')
    // const {session} = useSession()
    // const [loading, setLoading] = useState(false)
    //  const [interviews, setInterviews] = useState([])
     
    //  useEffect(() => {
    //      const fetchAllInterviews = async () => {
    //       if (session?.user) {
    //         try {
    //           const userId = session.user

    //           setLoading(true)

    //           const fetchedInterviews = await getInterviewByUser()

    //           setInterviews(fetchedInterviews)

    //         } catch (err) {
    //           console.error("Error fetching interviews:", err)
    //           setError("Failed to load events.")
    //         } finally {
    //           setLoading(false)
    //         }
    //       }
    //     }

    //        fetchAllInterviews()
    //   }, [])

      // console.log({interviews})
     
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
                   <InterviewCard {...interview} key={interview.id} />
                 ))}
                 </div>
            </div>
       </section>
         
        <section className='flex flex-col gap-6 mt-6'>
           <h2>Take an Interview</h2>
            <div className='gap-5 grid xl:gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'>
              {hasInterview ?  interviews.map((interview) => (
                   <InterviewCard {...interview} key={interview?._id} interviewId={interview?._id}/>
                 )) : (
                   <p>There are no interviews available</p> 
                 )}
                 </div>
        </section>
     </>
   )
 }
 
 export default InterviewPage