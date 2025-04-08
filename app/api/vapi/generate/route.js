import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { getRandomInterviewCover } from "@/lib/utils"
import Interview from "@/lib/database/model/interview.model"
import { connectToDatabase } from "@/lib/mongodb"

// export async function GET() {
//     return Response.json({success: true, data: 'Thank You!'}, {status: 200})
// }

export async function POST(request) {
    const { type, role, level, techstack, amount, userid } = await request.json();
  
    try {
      // Generate the interview questions
      const { text: questions } = await generateText({
        model: google("gemini-2.0-flash-001"),
        prompt: `Prepare questions for a job interview.
          The job role is ${role}.
          The job experience level is ${level}.
          The tech stack used in the job is: ${techstack}.
          The focus between behavioural and technical questions should lean towards: ${type}.
          The amount of questions required is: ${amount}.
          Please return only the questions, without any additional text.
          The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
          Return the questions formatted like this:
          ["Question 1", "Question 2", "Question 3"]
          
          Thank you! <3
      `});

      console.log("AI Response:", questions); // Add this line to check the response

      // If the response isn't what you expected, handle that case
      if (!questions) {
        throw new Error("No questions returned from AI.");
      }
  
  
      // Prepare the interview data
        const empty = ''

      await connectToDatabase();

      const interview =  await Interview.create({
        role: role,
        type: type,
        level: level,
        techstack: techstack, // Ensure it is an array of strings
        questions: JSON.parse(questions),
        userId: userid,
        finalized: true,
        coverImage: getRandomInterviewCover(),
        createdAt: new Date().toISOString(),
      });
  
      // Connect to MongoDB (Make sure DB is connected before saving)
  
      // Save the interview document to MongoDB
      return new Response(JSON.stringify({ success: true, interview }), { status: 200 });
      
    } catch (error) {
      console.error("Error:", error);
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
  }