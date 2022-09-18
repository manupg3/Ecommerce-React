import React from 'react'
import '../assets/css/home.scss'
import CardsInfo from '../components/CardsInfo'
import Products from '../components/Products'
import SliderHome from '../components/SliderHome'
import InitialState from '../InitialState'
import TextAnimation from '../components/TextAnimation'
import ContentPromo from '../components/ContentPromo'
import CardsCategories from '../components/CardsCategories'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import ModalLoginRegister from '../components/ModalLoginRegister'
import {supabaseClient} from '../database/supabase/client'
import useProfile from '../hooks/useGetUserProfile'

function HomePage() {
  const classTextKemi="content-kemi"
  const classTextCharacter="animate-character"
  const textFeaturedProductos = "Featured Products"
  const textMoreSales = "Most Selled Products"

  return (
    <div >
     <SliderHome />
     <CardsInfo />
     <TextAnimation classText={classTextCharacter} text={textFeaturedProductos} />
    <Products products={InitialState.products}/>
    <ContentPromo />
    <TextAnimation classText={classTextCharacter} text={textMoreSales} />
    <Products products={InitialState.products}/>
    <CardsCategories />
    <NewsletterSubscribe />
  
    </div>
  )
}

export default HomePage