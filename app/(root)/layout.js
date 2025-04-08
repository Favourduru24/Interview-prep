import "../globals.css"
import Header from '../../components/Header'
import Provider from "@/components/Provider"

const RootLayout = ({children}) => {
  return (
      <Provider>
    <div className='root-layout'>
      <Header/>
      {children}
      </div>
    </Provider>
  )
}

export default RootLayout