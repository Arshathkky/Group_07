import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Header = ({setRole}) => {
  return (
    <nav>

      {setRole === 'admin' ? (<div className='Nav'>
          <h1 className='logo'>Sports Pro</h1>
          <ul className='nav-list' id='myTopnav'>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/addScore'>Add Score</Link></li>
            <li><Link to='/addEvent'>Add Event</Link></li>
            <li><Link to='/addGallery'>Add Gallery</Link></li>
            <li><Link to='/addStaff'>Add Staff</Link></li>
            <li><Link to='/addNews'>Add News</Link></li>
            <li><Link to='/addSchedule'>Add Schedule</Link></li>
            <li><Link to='/signOut'>Sign out</Link></li>          
          </ul>
      </div>) : (
      <div className='Nav'>
         <h1 className='logo'>Sports Pro</h1>
         <ul className='nav-list' id='myTopnav'>
           <li><Link to='/'>Home</Link></li>
           <li><Link to='/Sport'>Sports</Link></li>
           <li><Link to='/gallery'>Gallery</Link></li>
           <li><Link to='/staff'>Staff</Link></li>
           <li><Link to='/sign'>Sign In</Link></li>          
         </ul>
      </div>
      )}
   </nav>
  )
}

export default Header