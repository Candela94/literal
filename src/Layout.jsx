
import Comming from "./pages/coming/CommingSoon"
import Landing from "./pages/landing/Literal"
import { Outlet } from "react-router"
import Product from "./pages/product/Product"
import Prueba from "./pages/product/Prueba"
import { Cookies } from "./components/cookies/Cookies"




function Layout() {
 

  return (
    <>
{/* <Comming /> */}

{/* <Outlet /> */}
<Prueba />
<Cookies />


    </>
  )
}

export default Layout
