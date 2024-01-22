import { Routes, Route } from 'react-router-dom'
import Home from '../pages/userPages/Home'
import Gallery from '../pages/userPages/Gallery'
import Sport from '../pages/userPages/Sport'
import Staff from '../pages/userPages/Staff'
import SignIn  from '../pages/userPages/Sign'
import Cricket from '../pages/userPages/sports/Cricket'
import Football from '../pages/userPages/sports/Football'
import Badminton from '../pages/userPages/sports/Badminton'
import Volleyball from '../pages/userPages/sports/Volleyball'
const UserRoutes = () => {   
  return (
    
      <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/sport' element={<Sport/>}/>
        <Route path='/staff' element={<Staff/>}/>
        <Route path='/sign' element={<SignIn/>}/>
        <Route path='/cricket' element={<Cricket/>}/>
        <Route path='/football' element={<Football/>}/>
        <Route path='/badminton' element={<Badminton/>}/>
        <Route path='/volleyball' element={<Volleyball/>}/>
        
      </Routes>
    
  )
}

export default UserRoutes
