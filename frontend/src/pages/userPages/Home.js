import React from 'react'

import Sliderbar from  '../../components/homeComponent.js/Sliderbar'
import News from '../../components/homeComponent.js/News'
import Event from '../../components/homeComponent.js/Events'
import Score from '../../components/homeComponent.js/Score'
import AdminRoutes from '../../Routes/AdminRoutes'
const Home = () => {
  return (
    <div>
        <AdminRoutes/>
        <Sliderbar/>
        
        <Score/>
        <Event/>
        <News/>
    </div>
  )
}

export default Home

