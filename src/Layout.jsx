
import Comming from "./pages/coming/CommingSoon"
import { Outlet } from "react-router"
import Landing from './pages/landing/Landing'
import Product from "./pages/product/Product"
import { Cookies } from "./components/cookies/Cookies"


import AttentionImages from "./components/attentionImg/AttentionImg"

function Layout() {


  return (

    <>


      <Outlet />
      
     
{/* <AttentionImages /> */}

    </>
  )
}

export default Layout
