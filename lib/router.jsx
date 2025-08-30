

import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../src/pages/protected-route/ProtectedRoute";
import Landing from "../src/pages/landing/Landing";
import Layout from "../src/Layout";
import Product from "../src/pages/product/Product";

import LoginAdmin from "../src/pages/admin/LoginAdmin";
import AdminForm from "../src/pages/admin/AdminForm";
import Comming from "../src/pages/coming/CommingSoon";





const router = createBrowserRouter([{

    path: '/',
    element: <Layout />,
    children: [

        {
            index: true,
            element:<Comming />
        },


        {
            path:"/admin/login",
            // element: <ProtectedRoute requiredRole = 'admin' />,
            children : [
                {
                index : true ,
                element : <LoginAdmin />
                }
            ]
        },



        {
            path:"/admin/uploads",
            element: <ProtectedRoute requiredRole = 'admin' />,
            children : [
                {
                index : true ,
                element : <AdminForm />
                }
            ]
        },



        {
            path: "/product/:pid",
            element: <Product />
          }
          



       
    ]


}])


export default router