"use client"

import {  Github, TriangleAlert } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import  { useState, useEffect } from 'react'
import { toast } from 'sonner'
import {  useRouter } from 'next/navigation'
import {signIn} from 'next-auth/react'

const AuthForm = ({type}) => {

   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   const [form, setForm] = useState({
    username: '',
    email:'',
    password: '',
    confirmPassword: ''
 })

   const router = useRouter()

   useEffect(() => {
     if(error) {
      return setError('')
     }
   }, [form])

   const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password
      
   })

    if(res?.ok) {
      router.push('/')
      toast.success("Login Successfully!")
    } else if (res?.status === 400){
       setError("Invalid Credentials!")
       setLoading(false)
     } else if(res?.status === 400) {
      setError("Something went wrong reload and try again!")
      setLoading(false)
     }else {
       setError("Something went wrong!")
       setLoading(false)
     }

    }

   const handleSignUp = async (e) => {

     e.preventDefault()
       setLoading(true)
      
        const response = await fetch('/api/auth/signup', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(form)
        })
        
        const data = await response.json()

        if(response.ok) {
          setLoading(false)
           
          toast.success(data?.message)
          router.push("/sign-in")
         } else if (response.status === 400) {
          setError(data.message)
          setLoading(false)
         } else if(response.status === 500) {
           setError(data.message)
           setLoading(false)
         }
      } 

    
    const isSignIn = type === 'sign-in'

     
  return (
    <form className='border-gradient p-0.5 rounded-2xl w-fit lg:min-w-[566px]' onSubmit={isSignIn ? handleLogin : handleSignUp}>
        <div className='flex-col flex gap-2 card py-14 px-10'>
           <div className='flex flex-col gap-2 justify-center  w-full items-center'>
             <div className='flex gap-2 mb-2' >
       <Image src="/logo.svg" alt='logo' height={32} width={38}/>
        <h2 className='text-primary-100'>PrepWise</h2>
        </div> 
           <h3>Practice job interview with AI</h3>
           </div>
           <div className='w-full space-y-4 mt-4 w-full flex flex-col mb-5'>
               {!isSignIn && <label className='flex flex-col gap-2'>
                <p className='label'>Username</p>
              <input type='text' className='!bg-dark-200 !rounded-full !min-h-12 !px-5 placeholder:!text-light-100 placeholder:text-sm placeholder:text-sm' placeholder='Username' required value={form.username} onChange={(e) => setForm({...form, username: e.target.value})}/>
              </label> }
               <label className='flex flex-col gap-2'>
                <p className='label'>Email</p>
              <input type='email' className='!bg-dark-200 !rounded-full !min-h-12 !px-5 placeholder:!text-light-100 placeholder:text-sm' placeholder='email@gmail.com' required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
              </label>
               <label className='flex flex-col gap-2'>
                <p className='label'>Password</p>
              <input type='password' className='!bg-dark-200 !rounded-full !min-h-12 !px-5 placeholder:!text-light-100 placeholder:text-sm' placeholder='Password' required value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
              </label>
               {!isSignIn && <label className='flex flex-col gap-2'>
                <p className='label'>Comfirm Password</p>
              <input type='password' className='!bg-dark-200 !rounded-full !min-h-12 !px-5 placeholder:!text-light-100 placeholder:text-sm' placeholder='*********' required value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})}/>
              </label>}
               {!!error && (
           <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive '>
              <div className='flex items-center justify-center gap-2'>
               <TriangleAlert/>
                <p className='text-destructive font-semibold font-sans'>{error}</p>
                </div>
           </div>
               )}
                
            
        
           </div>
             {loading ?
             (
              <button className="inline-block px-7 py-3 font-bold text-sm leading-5 text-white transition-colors duration-150 bg-success-100 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-success-200 hover:bg-success-200 min-w-28 cursor-pointer items-center justify-center overflow-visible">
                 {'Loading...'}
           </button>
            ) : (
              <button type="submit" className="inline-block px-7 py-3 font-bold text-sm leading-5 text-white transition-colors duration-150 bg-success-100 border border-transparent rounded-full shadow-sm focus:outline-none focus:shadow-2xl active:bg-success-200 hover:bg-success-200 min-w-28 cursor-pointer items-center justify-center overflow-visible">
              {isSignIn ? 'Sign in' : 'Create an Account'}
           </button>
            )}
           
            
            <div className='flex gap-2 justify-center items-center mt-5'>

           <button className='!bg-dark-200 w-full h-12 rounded-md items-center justify-center flex font-bold transition-colors cursor-pointer text-primary-100'>Google</button>

           <button className='!bg-dark-200 w-full h-12 rounded-md items-center justify-center flex cursor-pointer gap-2 text-primary-100'  >
           <Github className='text-blue-500 size-5' />
             <p className=' font-bold transition-color  text-primary-100'>Github</p>
           </button>
         </div>
            
         <p className='text-center '>{isSignIn ? 'No account yet?' : 'Have an account already?'}{' '}
              <Link href={!isSignIn ? "/sign-in" : 'sign-up'} className='underline'>
                 {!isSignIn ? "Sign in" : "Sign up"} 
              </Link>
            </p>
        </div>
         
    </form>
  )
}

export default AuthForm