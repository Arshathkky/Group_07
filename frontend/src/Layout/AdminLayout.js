import React from 'react'
import AddEvents from '../pages/adminPages/AddEvents'
import AddNews from '../pages/adminPages/AddNews';
import AddGallary from '../pages/adminPages/AddGallary';
const AdminLayout=()=>{
  return (
    <div>
      <AddEvents></AddEvents>
      <AddNews></AddNews>
      <AddGallary></AddGallary>
    </div>
  )
}
export default AdminLayout;