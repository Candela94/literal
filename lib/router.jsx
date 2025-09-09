

import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../src/pages/protected-route/ProtectedRoute";
import Landing from "../src/pages/landing/Landing";
import Layout from "../src/Layout";
import Product from "../src/pages/product/Product";

import LoginAdmin from "../src/pages/admin/LoginAdmin";
import AdminForm from "../src/pages/admin/AdminForm";
import Comming from "../src/pages/coming/CommingSoon";
import Carrito from "../src/pages/carrito/Carrito";

import CheckOut from "../src/pages/checkout/CheckOut";
import { CarritoMenu } from "../src/components/cartmenu/CartMenu";

const router = createBrowserRouter([{

    path: '/',
    element: <Layout />,
    children: [



        {
            index: true,
            element: <Comming />
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
        },


        {
            path: "/carrito/desk",
            element: <CarritoMenu />
        },


        {
            path: "/adress",
            element: <CheckOut />
        }






    ]


}])


export default router