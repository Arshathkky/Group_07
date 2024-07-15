import React from 'react';
import './style.css';
import { FcSportsMode } from "react-icons/fc";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='Footer'>
      <div className='info'>
        <h1><FcSportsMode />Sports Pro</h1>
        <h4>We manage all sport activities for university students</h4>
      </div>
      <div className='social'>
        <h1>Social Media</h1>
        <ul className='link'>
          <li><a href='https://facebook.com'><FaFacebookF className='icon' />Facebook</a></li>
          <li><a href='https://instagram.com'><FaInstagram className='icon' />Instagram</a></li>
          <li><a href='https://twitter.com'><FaTwitter className='icon' />Twitter</a></li>
          <li><a href='https://youtube.com'><FaYoutube className='icon' />YouTube</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
