import React from 'react'

import Header from '../components/common/Header';
import { useContext } from 'react';
import UserContext from '../UserContext';
import AdminRoutes from '../Routes/AdminRoutes';
import { Link } from 'react-router-dom';


const AdminLayout=()=>{
    const value = useContext(UserContext)
    const [role] = value
  return (
    <div >
      <Header setRole={role}></Header>
      <div className='adminContainer'>
         <AdminRoutes />
      </div>
    </div>
  )
}
export default AdminLayout;