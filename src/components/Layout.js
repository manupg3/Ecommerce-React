import React from 'react'
import Header from './Header'
import Footer from './Footer'
import '../assets/css/layout.css'
import AppContext from '../context/AppContext'
import  Navbar  from '../components/Navbar'

const Layout = ({ children }) => {
  
  return (
    <div className="Main">
      <Navbar />
      <div >
      {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout