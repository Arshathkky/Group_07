import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Header = () => {
  return (
    <nav>
      <div className='Nav'>
          <h1 className='logo'>Sports Pro</h1>
          <ul className='nav-list' id='myTopnav'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/Sport'>Sports</Link></li>
            <li><Link to='/gallary'>Gallary</Link></li>
            <li><Link to='/staff'>Staff</Link></li>
            <li><Link to='/signin'>Sign In</Link></li>          
          </ul>
      </div>
   </nav>
  )
}

export default Header