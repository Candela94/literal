
import Comming from "./pages/coming/CommingSoon"
import { Outlet } from "react-router"
import Landing from './pages/landing/Landing'
import Product from "./pages/product/Product"
import Prueba from "./pages/product/Prueba"
import { Cookies } from "./components/cookies/Cookies"




function Layout() {


  return (

    <>


      <Outlet />
      
     


    </>
  )
}

export default Layout
