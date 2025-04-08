"use client"
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {toast} from 'sonner'

const Header = () => {

     const {data: userId} = useSession()
     const router = useRouter()
          
     const userName = userId?.user?.name?.charAt(0).toUpperCase()
    
     const [open, setOpen] = useState(true)

     const handleOpen = () => {
        setOpen((prev) => !prev)
     }
   
      const handleLogOut = async () => {
          await signOut({
            redirect: false,

          })
          router.push('/sign-in')
          toast.success('Logout successfully!')
           
      } 


  return (
        <div className='flex justify-between items-center w-full'>
    <nav>
    <Link href="/" className='flex items-center gap-2'>
     <Image src="/logo.svg" alt='logo' width={38} height={32}/>
      
      <h2 className='text-primary-100'>PrepWise</h2>
    </Link>
   </nav>
      {
        userId?.user?.image  ? (
           <div className='w-10 h-10 rounded-full'>
           <Image src={userId?.user?.image} width={10} height={10} alt='logo'/>
           </div>
        ) : (
           <div className={`${userId ? 'bg-primary-100 h-10 w-10 rounded-full flex justify-center items-center cursor-pointer relative' : 'h-10 w-10 rounded-full flex justify-center items-center cursor-pointer relative'}`} onClick={handleOpen}>

          <p className='text-black font-semibold text-2xl'>{userName}</p>
           { open || userId && <div className='absolute z-10 !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80  !font-bold px-5 cursor-pointer min-h-10 -bottom-12 right-2 rounded-sm flex justify-center items-center w-28' onClick={handleLogOut}>
             <p className='text-black font-bold'>Logout</p>
           </div>
}
        </div> 
        )
      }
    
   </div>
  )
}

export default Header