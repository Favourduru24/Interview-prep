import {Schema, models, model} from 'mongoose'

const InterviewSchema = new Schema({
   role: { type: String, required: true },
   type: { type: String, required: true },
   level: { type: String, required: true },
   techstack: { type: String, required: true }, // Array of strings
   questions: { type: [String], required: true }, // Array of strings (questions)
   userId: { type: String, required: true},
   finalized: { type: Boolean, default: true },
   coverImage: { type: String },
   createdAt: { type: Date, default: Date.now }
},
  {
    timestamps: true
  }
)

const Interview = models.Interview || model('Interview', InterviewSchema)

export default Interview