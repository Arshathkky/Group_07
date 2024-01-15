import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import './style.css';

// Importing slide images dynamically
import Slide1 from '../../Assets/Images/slide1.jpg';
import Slide2 from '../../Assets/Images/slide2.jpg';
import Slide3 from '../../Assets/Images/slide3.jpg';

const slideImages = [Slide1, Slide2, Slide3];

const Sliderbar = () => {
  return (
    <Slide>
      {slideImages.map((slide, index) => (
        <div key={index} className='each-slide-effect'>
          <div>
          <img src={slide} alt={`slide${index + 1}`} />
          </div>
        </div>
      ))}
    </Slide>
  );
};

export default Sliderbar;