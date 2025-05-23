import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

 if(!MONGODB_URI) {
    console.log('Missing MONGODB_URI!')
 }

 let cached = mongoose || {conn :null, promise: null};

 export const connectToDatabase = async () => {
     if(cached.conn) return cached.conn;
        
      if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

      cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
         dbName: 'chat-app',
         bufferCommands: false,
      })


      cached.conn = await cached.promise

      return cached.conn
 }