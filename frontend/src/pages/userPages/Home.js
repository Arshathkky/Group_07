import React from 'react'

import Sliderbar from  '../../components/homeComponent.js/Sliderbar'
import News from '../../components/homeComponent.js/News'
import Event from '../../components/homeComponent.js/Events'
const Home = () => {
  return (
    <div>
        <Sliderbar/>
        <Event/>
        <News/>
    </div>
  )
}

export default Home

