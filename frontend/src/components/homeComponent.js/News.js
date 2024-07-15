import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css'; // Import the scoped CSS for News component

const News = () => {
  const [news, setNews] = useState([]);
  const [allchecked, setAllChecked] = useState(['sport', 'event', 'common']);
  const [expanded, setExpanded] = useState({}); // Track which items are expanded

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/news/getNews');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching events: ', error);
    }
  };

  const handleChange = (e) => {
    const category = e.target.value;
    if (e.target.checked) {
      setAllChecked([...allchecked, category]);
    } else {
      setAllChecked(allchecked.filter((item) => item !== category));
    }
  };

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredNews = news.filter((data) => allchecked.includes(data.category));

  return (
<<<<<<< HEAD
    <div className="news-component">
      <h2>Display News</h2>
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            value="sport"
            onChange={handleChange}
            checked={allchecked.includes('sport')}
          />
          Sport
        </label>
        <label>
          <input
            type="checkbox"
            value="event"
            onChange={handleChange}
            checked={allchecked.includes('event')}
          />
          Event
        </label>
        <label>
          <input
            type="checkbox"
            value="common"
            onChange={handleChange}
            checked={allchecked.includes('common')}
          />
          Common
        </label>
      </div>

      <div className="news-container">
        <ul>
          {filteredNews.map((data) => (
            <li key={data._id} className="news-item">
              <h2>{data.title}</h2>
              <div className="news-image">
                <img src={`http://localhost:5000/uploads/${data.photo}`} alt="grid_image" />
              </div>
              <p className={expanded[data._id] ? 'expanded' : ''}>
                {data.body}
              </p>
              <button className='read' onClick={() => toggleReadMore(data._id)}>
                {expanded[data._id] ? 'Read Less' : 'Read More'}
              </button>
=======
    <div>
      <h2>Display news</h2>
      <label><input type='checkbox' value="sport" onChange={handleChange} checked={allchecked.includes('sport')} />sport</label>
      <label><input type='checkbox' value="event" onChange={handleChange} checked={allchecked.includes('event')} />Event</label>
      <label><input type='checkbox' value="common" onChange={handleChange} checked={allchecked.includes('common')} />Common</label>
      
      <div className='news-container'>
      <ul >
          {filteredNews.map((data) => (
            <li key={data._id}>
              <h2>{data.title}</h2>
              <div className='newsImage'>
                    <img src={`http://localhost:5000/uploads/${data.photo}`} alt="grid_image"/><br/>
              </div>
              <p>{data.body}</p>
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default News;
