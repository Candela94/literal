
import Comming from "./pages/coming/CommingSoon"
import { Outlet } from "react-router"
import Landing from './pages/landing/Landing'
import Product from "./pages/product/Product"
import { Cookies } from "./components/cookies/Cookies"
import {StickersAttention} from  './components/stickers/Stickers'






function Layout() {


  return (

    <>
{/* <StickersAttention /> */}

      <Outlet />
      
     

    </>
  )
}

export default Layout
