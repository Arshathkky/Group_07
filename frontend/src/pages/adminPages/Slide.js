import React from 'react';

const Slideshow = ({ photos }) => {
  return (
    <div className="slideshow">
      {photos.map(({ photo, _id }) => (
        <div key={_id} className="slideshow__item">
          <img src={`http://localhost:5000/uploads/${photo}`} alt="slideshow_image" className='slideshow-image' />
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
