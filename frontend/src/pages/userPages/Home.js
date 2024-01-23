import React from 'react'

import Sliderbar from  '../../components/homeComponent.js/Sliderbar'
import News from '../../components/homeComponent.js/News'
import Event from '../../components/homeComponent.js/Events'
import ScoresList from '../../components/homeComponent.js/Score'
const Home = () => {
  return (
    <div>

        <Sliderbar/>
        <ScoresList/>
        <Event/>
        <News/>
    </div>
  )
}

export default Home

