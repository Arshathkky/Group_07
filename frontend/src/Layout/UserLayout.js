import React from 'react'
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Event from '../components/homeComponent.js/Events'
const UserLayout=()=>{
  return(
    <div>
    <Header></Header>
    <Event></Event>
    <Footer></Footer>
    </div>
  )
}

export default UserLayout;