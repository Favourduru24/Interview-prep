import { NextResponse } from "next/server";
import User from "@/lib/database/model/user.model";
import bcrypt from 'bcryptjs'
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request) {

    const {username, email, password, confirmPassword} = await request.json()

    if(!username || !email || !password || !confirmPassword) {
         return   NextResponse.json({message:'All field are required!'}, {status: 400}) 
    }

    if(confirmPassword !== password) {
        return NextResponse.json({message: 'Not Matching Password!'}, {status: 400})
     }

     if(password.length < 6) {
        return NextResponse.json({message: "Password must be at least 6 character long!"}, {status: 400}) 
     }
     
      try {
        await connectToDatabase()
        
        const duplicateUser = await User.findOne({email})

        if(duplicateUser) {
            return NextResponse.json({message: 'User already created!'}, {status: 400})
        } 

     const hashedPassword = await bcrypt.hash(password, 10)

     const newUser = new User({
         email,
         username,
         password: hashedPassword
     })

      await newUser.save()
      
      return NextResponse.json({message: `User ${username} created!`}, {status: 201})

      } catch {
        return NextResponse.json({message: 'Something went wrong reload and try again!'}, {status: 500})
      }
}