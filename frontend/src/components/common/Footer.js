import React from 'react'
import './style.css'
import { FcSportsMode } from "react-icons/fc";
import { FaFacebookF, FaInstagram ,FaTwitter, FaYoutube} from "react-icons/fa";



const Footer = () => {
  return (
    <div className='Footer'>
        <div className='info'>
              <h1><FcSportsMode></FcSportsMode>Sports Pro</h1>
              <h4>We manage the all sport activites from here for university students</h4>
        </div>
        <div className='social'>
             <h1>Social Media</h1>
             <ul className='link li'>
                  <li><a href='facebook.com'><FaFacebookF className='icon'/>Facebook</a></li>
                  <li><a href='instragram.com'><FaInstagram className='icon'/>Instragram</a></li>
                  <li><a href='twitter.com'><FaTwitter className='icon'/>twitter</a></li>
                  <li><a href='youtube.com'><FaYoutube className='icon'/>Youtube</a></li>
             </ul>
        </div>
        
    
    </div>
  )
}

export default Footer