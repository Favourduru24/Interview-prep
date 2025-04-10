import InterviewDetail from '@/components/InterviewDetail'
import { getInterviewById } from '@/lib/actions/interview.actions'

const Page = async ({params}) => {

   const {id} = await params 

    const interviewId = await getInterviewById(id)

  return (
  <InterviewDetail interview={interviewId} id={id}/>
)
}

export default Page