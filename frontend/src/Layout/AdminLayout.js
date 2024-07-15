import React from 'react'

import Header from '../components/common/Header';
import { useContext } from 'react';
import UserContext from '../UserContext';
import AdminRoutes from '../Routes/AdminRoutes';
<<<<<<< HEAD

=======
import { Link } from 'react-router-dom';
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be


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