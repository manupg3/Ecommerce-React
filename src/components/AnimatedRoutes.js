import React, {useEffect} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import Page404 from "../containers/404page"
import HomePage from "../containers/Home"
import InformationPage from "../containers/Information"
import PaymentPage from "../containers/Payment"
import SuccessPage from "../containers/Success"
import {AnimatePresence} from 'framer-motion'
import Layout from '../components/Layout'
import ShopPage from '../pages/shopPage'
import AboutPage from '../pages/aboutPage'
import ContactPage from '../pages/contactPage'
import CheckoutPage from '../containers/Checkout'
import { supabaseClient } from '../database/supabase/client'
import ProductPage from '../pages/ProductPage'

function AnimatedRoutes() {
    const location = useLocation();
  

useEffect(() => {
  
      supabaseClient.auth.onAuthStateChange((event, session)=>{
             if(!session){
                console.log("NO ESTA LOGEADO")
             }
             else{
             }
      })
}, [])


  return (
    // <AnimatePresence>

    <Layout>

    <Routes location={location} key={location.pathname}>
           <Route exact path='/' element={<HomePage />} />
        <Route exact path='/checkout-information' element={<InformationPage />} /> 
        <Route exact path='/checkout' element={<CheckoutPage />} /> 
        <Route exact path='/checkout-payment' element={<PaymentPage />} />
        <Route exact path='/checkout-success' element={<SuccessPage />} />
        <Route exact path='/shop' element={<ShopPage />} />
        <Route exact path='/about' element={<AboutPage />} />
        <Route exact path='/contact' element={<ContactPage />} />
        <Route exact path='/product-page' element={<ProductPage />} /> 

        <Route element={<Page404 />} />
    </Routes>

    </Layout>

    //</AnimatePresence>
  )
}

export default AnimatedRoutes