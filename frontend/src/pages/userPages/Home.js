import React from 'react'

import Sliderbar from  '../../components/homeComponent.js/Sliderbar'
import News from '../../components/homeComponent.js/News'
import Event from '../../components/homeComponent.js/Events'
<<<<<<< HEAD
import Score from '../../components/homeComponent.js/Score'
import AdminRoutes from '../../Routes/AdminRoutes'
const Home = () => {
  return (
    <div>
        <AdminRoutes/>
        <Sliderbar/>
        
        <Score/>
=======
import ScoresList from '../../components/homeComponent.js/Score'
const Home = () => {
  return (
    <div>

        <Sliderbar/>
        <ScoresList/>
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be
        <Event/>
        <News/>
    </div>
  )
}

export default Home

