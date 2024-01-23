import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../pages/adminPages/AdminHome'
import AddScore from '../pages/adminPages/AddScore'
import AddEvents from '../pages/adminPages/AddEvents'
import AddGallery from '../pages/adminPages/AddGallery'
import AddStaff from '../pages/adminPages/AddStaff'
import AddNews from '../pages/adminPages/AddNews'
import AddSchedule from '../pages/adminPages/AddSchedule'
import SignOut from '../pages/adminPages/SignOut'

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/home' Component={AdminHome}></Route>
        <Route path='/addScore' Component={AddScore}></Route>
        <Route path='/addEvent' Component={AddEvents}></Route>
        <Route path='/addGallery' Component={AddGallery}></Route>
        <Route path='/addStaff' Component={AddStaff}></Route>
        <Route path='/addNews' Component={AddNews}></Route>
        <Route path='/addSchedule' Component={AddSchedule}></Route>
        <Route path='/signOut'Component={SignOut}></Route> 
    </Routes>
  )
}

export default AdminRoutes
