import User from "@/lib/database/model/user.model";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from 'bcryptjs';
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

  

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {

         if(!credentials?.email || !credentials?.password) {
          return null
         }
          
        try {
          await connectToDatabase();
          
          // Look for the user by email
          const user = await User.findOne({ email: credentials?.email.toString()});

          if (!user) {
            console.error('No user found with this email:', credentials?.email);
            throw new Error('No user found with this email');
          }

          // Check the password
          const isValidPassword = await bcrypt.compare(credentials?.password.toString() ?? "", user.password);

          if (!isValidPassword) {
            console.error('Invalid password for user:', credentials?.email);
            throw new Error('Invalid password');
          }

          // Return user if authenticated successfully
          return user;
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;  // Return null to signal authentication failure
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.username;  // Make sure to map 'username' to 'name'
        token.image = user.image || '';  // Handle user image if available
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          email: token.email,
          name: token.name,  // Set 'name' from the token
          image: token.image,
          id: token.id  // Ensure 'image' is handled properly
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',  // Customize the sign-in page
    error: '/auth/signin',    // Customize the error page
  },
  secret: process.env.NEXTAUTH_SECRET,
  
});

export { handler as GET, handler as POST };

 

