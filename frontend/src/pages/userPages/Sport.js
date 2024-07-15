import React from 'react';
import { Link } from 'react-router-dom';
import { MdSportsCricket } from 'react-icons/md';
import { IoIosFootball } from 'react-icons/io';
import { TbPlayVolleyball } from 'react-icons/tb';
import { GiShuttlecock } from 'react-icons/gi';
import image1 from '../../Assets/Images/cricket.jpg'
import image2 from '../../Assets/Images/footbal.jpg'
import image3 from '../../Assets/Images/vollyball.jpg'
import image4 from '../../Assets/Images/Badminton.jpg'
import './Sportstyle.css'


const sportsData = [
  { name: 'Cricket', image: image1, icon: <MdSportsCricket /> },
  { name: 'Football', image: image2, icon: <IoIosFootball /> },
  { name: 'Volleyball', image: image3, icon: <TbPlayVolleyball /> },
  { name: 'Badminton', image: image4, icon: <GiShuttlecock /> },
  { name: 'Cricket', image: image1, icon: <MdSportsCricket /> },
  { name: 'Football', image: image2, icon: <IoIosFootball /> },
  { name: 'Volleyball', image: image3, icon: <TbPlayVolleyball /> },
  { name: 'Badminton', image: image4, icon: <GiShuttlecock /> },
];

const Sports = () => {
  return (
    <div>
      <div className='sport_area'>
        <ul>
          {sportsData.map((sport, index) => (
            <li key={index} className='sport'>
              <img src={sport.image} alt={sport.name} className='image' />
              <div className='overlay'>
                <p>
                  <Link to={`/${sport.name.toLowerCase()}`} className='subheading'>
                    {sport.name}
                  </Link>
                </p>
                <Link to={`/${sport.name.toLowerCase()}`} className='logo'>{sport.icon}</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sports;
