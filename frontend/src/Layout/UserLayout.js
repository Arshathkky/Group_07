import React from 'react'
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import UserRoutes from '../Routes/UserRoutes';
import { useContext } from 'react';
import UserContext from '../UserContext';
const UserLayout=()=>{
    const value = useContext(UserContext)
    const [role] = value
  return(
    <div>
    <Header setRole={role}></Header>
    <UserRoutes/>
    <Footer></Footer>
    </div>
  )
}

export default UserLayout;