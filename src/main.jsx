import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import Layout from './Layout'


import router from '../lib/router.jsx'
import { RouterProvider } from 'react-router'
import { CartProvider } from './context/CartContext.jsx'

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"


const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLIC_KEY)


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Elements stripe={stripePromise}>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
    </Elements>
  </StrictMode>,
)
