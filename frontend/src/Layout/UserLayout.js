import React from 'react'
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Home from '../pages/userPages/Home';
const UserLayout=()=>{
  return(
    <div>
    <Header></Header>
    <Home/>
    <Footer></Footer>
    </div>
  )
}

export default UserLayout;