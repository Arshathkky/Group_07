import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [photo, setPhoto] = useState(null);
  const [news, setNews] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentNewsId, setCurrentNewsId] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/news/getNews');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      formData.append('category', category);
      formData.append('photo', photo);

      await axios.post('http://localhost:5000/api/news/addNews', formData);
      alert('News added successfully');
      clearForm();
      fetchNews();
    } catch (error) {
      console.error('Error adding news:', error);
      alert('Error adding news. Please try again.');
    }
  };

  const handleUpdateNews = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      formData.append('category', category);

      if (photo) {
        formData.append('photo', photo);
      }
  
      await axios.put(`http://localhost:5000/api/news/updateNews/${currentNewsId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('News updated successfully');
      clearForm();
      setUpdate(false);
      setCurrentNewsId(null);
      fetchNews();
    } catch (error) {
      console.error('Error updating news:', error);
      alert('Error updating news. Please try again.');
    }
  };

  const handleDeleteNews = async (newsId) => {
    try {
      await axios.delete(`http://localhost:5000/api/news/deleteNews/${newsId}`);
      alert('News deleted successfully');
      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Error deleting news. Please try again.');
    }
  };

  const clearForm = () => {
    setTitle('');
    setBody('');
    setCategory('');
    setPhoto(null);
  };

  return (
    <div className='AdminContainer'>
      <h1>{update ? 'Update News' : 'Add News'}</h1>
      <form onSubmit={update ? handleUpdateNews : handleAddNews}>
        <label>
          Category:
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Title:
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Body:
          <input
            type='text'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Image:
          <input type='file' onChange={(e) => setPhoto(e.target.files[0])} />
        </label>
        <br />
        <button type='submit'>{update ? 'Update News' : 'Add News'}</button>
      </form>

      <h2>Display News</h2>
      <ul>
        {news.map((data) => (
          <li key={data._id}>
            <h3>{data.title}</h3>
            <p>{data.body}</p>
            <div className='newsImage'>
              <img src={`http://localhost:5000/uploads/${data.photo}`} alt='News Thumbnail' />
            </div>
            <button onClick={() => {
              setUpdate(true);
              setCurrentNewsId(data._id);
              setTitle(data.title);
              setBody(data.body);
              setCategory(data.category);
            }}>Update</button>
            <button onClick={() => handleDeleteNews(data._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddNews;
