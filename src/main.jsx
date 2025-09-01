import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import Layout from './Layout'


import router from '../lib/router.jsx'
import { RouterProvider } from 'react-router'
import { CartProvider } from './context/CartContext.jsx'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
 <RouterProvider router={router} />
 </CartProvider>
  </StrictMode>,
)
