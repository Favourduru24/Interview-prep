"use server"

import Interview from "../database/model/interview.model"
import User from "../database/model/user.model"
import { connectToDatabase } from "../mongodb"

const populateEvent = async (query) => {
    return query
    .populate({path: 'userId', model: User, select: "_id username"})
}
  
export async function getInterviewByUser({userId}) {
    try {
      await connectToDatabase()
  
      const conditions = {userId}
  
      const interviewQuery = Interview.find(conditions).sort({ createdAt: 'desc'})

      const interview = await populateEvent(interviewQuery)
  
      return { data: JSON.parse(JSON.stringify(interview))}
      
    } catch (error) {
      handleError(error)
    }
  }

// export async function getInterviewByUser({ userId, limit = 3, page }) {
//     try {
//       await connectToDatabase()
  
//       const conditions = {organizer: userId }
//       const skipAmount = (page - 1) * limit
  
//       const eventsQuery = Interview.find(conditions)
//         .sort({ createdAt: 'desc' })
//         .skip(skipAmount)
//         .limit(limit)
  
//       const events = await populateEvent(eventsQuery)
//       const eventsCount = await Event.countDocuments(conditions)
  
//       return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
//     } catch (error) {
//       handleError(error)
//     }
//   }