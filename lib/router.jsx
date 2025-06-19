

import { createBrowserRouter } from "react-router";
import Landing from "../src/pages/landing/Literal";
import Layout from "../src/Layout";





const router = createBrowserRouter([{

    path: '/',
    element: <Layout />,
    children: [

        {
            index: true,
            element:<Landing />
        },


       
    ]


}])


export default router