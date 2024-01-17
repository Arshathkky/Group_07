import React from 'react'
import AddEvents from '../pages/adminPages/AddEvents'
import AddNews from '../pages/adminPages/AddNews';
const AdminLayout=()=>{
  return (
    <div>
      <AddEvents></AddEvents>
      <AddNews></AddNews>
    </div>
  )
}
export default AdminLayout;