import { Toaster } from '@/components/ui/sonner'
import "../globals.css"
import Provider from '@/components/Provider'

const AuthLayout = async ({children}) => {

  return (
       <Provider>
    <div className='auth-layout'>
      <Toaster/>
      {children}
      </div>
      </Provider>
  )
}

export default AuthLayout