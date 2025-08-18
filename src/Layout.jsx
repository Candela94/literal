
import Comming from "./pages/coming/CommingSoon"
import Landing from "./pages/landing/Literal"
import { Outlet } from "react-router"
import Product from "./pages/product/Product"
import AdminForm from "./pages/admin/AdminForm"
import LoginAdmin from "./pages/admin/LoginAdmin"

function Layout() {
 

  return (
    <>
{/* <Comming /> */}
<Outlet />

{/* <Product />  */}
{/* <AdminForm /> */}
{/* <LoginAdmin /> */}

{/* <Intro2 /> */}
    </>
  )
}

export default Layout
