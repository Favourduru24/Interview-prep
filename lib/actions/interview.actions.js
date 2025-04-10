"use server"
import Interview from "../database/model/interview.model"
import { connectToDatabase } from "../mongodb"

  const handleError = (error) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}

export async function getAllInterview() {
  try {
    await connectToDatabase();

    const interviewQuery = await Interview.find().lean();
     console.log("Fetched interviews:", interviewQuery);



    if (!interviewQuery || interviewQuery.length === 0) {
      throw new Error('No interviews found');
    }

    return interviewQuery
  } catch (error) {
     handleError(error)
  }
}

 export const getInterviewById = async (id) => {
   try{
     await connectToDatabase()

    const interviewId = await Interview.findById(id).lean()
    console.log('Fetched interviews:', interviewId)

     if(!interviewId) {
       throw new Error('No Interview found with this ID!')
     }

     return JSON.parse(JSON.stringify(interviewId))

   } catch (error) {
     handleError(error)
   }


}