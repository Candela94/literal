import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import Layout from './Layout'


import router from '../lib/router.jsx'
import { RouterProvider } from 'react-router'




createRoot(document.getElementById('root')).render(
  <StrictMode>
 <RouterProvider router={router} />
  </StrictMode>,
)
