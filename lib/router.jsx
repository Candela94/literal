

import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../src/pages/protected-route/ProtectedRoute";
import Landing from "../src/pages/landing/Landing";
import Layout from "../src/Layout";
import Product from "../src/pages/product/Product";

import LoginAdmin from "../src/pages/admin/LoginAdmin";
import AdminForm from "../src/pages/admin/AdminForm";
import Comming from "../src/pages/coming/CommingSoon";
import Carrito from "../src/pages/carrito/Carrito";





const router = createBrowserRouter([{

    path: '/',
    element: <Comming />,
    children: [



        {
            index: true,
            element: <Landing />
        },


        {
            path: "/admin/login",
            // element: <ProtectedRoute requiredRole = 'admin' />,
            children: [
                {
                    index: true,
                    element: <LoginAdmin />
                }
            ]
        },



        {
            path: "/admin/uploads",
            element: <ProtectedRoute requiredRole='admin' />,
            children: [
                {
                    index: true,
                    element: <AdminForm />
                }
            ]
        },



        {
            path: "/product/:pid",
            element: <Product />
        },




        {
            path: "/carrito",
            element: <Carrito />
        }





    ]


}])


export default router