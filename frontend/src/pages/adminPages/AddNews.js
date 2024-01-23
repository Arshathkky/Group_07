import React, { useState, useEffect } from 'react';
import axios from 'axios';


const AddNews = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [catagary, setCatagary] = useState('');
  const [photo,setPhotos] = useState('')
  const [news, setNews] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentNewsId, setCurrentNewsId] = useState(null);

 useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    // Load data from localStorage on component mount
    const storedNews = JSON.parse(localStorage.getItem('news'));
    if (storedNews) {
      setNews(storedNews);
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever the news state changes
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/news/getNews');
      setNews(response.data);
      setPhotos(response.data.photo)
    } catch (error) {
      console.error('Error fetching events: ', error);
    }
  };


  const handleAddNews = async (e) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('catagary', catagary);
        formData.append('photo', photo);
      await axios.post('http://localhost:5000/api/news/addNews', formData);
      alert('News added Successfully');
      clearForm();
      fetchNews();
    } catch (error) {
      console.error('News adding error: ', error);
      alert('Error adding news. Try again.');
    }
  };

  const handleUpdateNews = async () => {
    try {

      await axios.put(`http://localhost:5000/api/news/updateNews/${currentNewsId}`, { title, body, catagary });
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
      await axios.delete(`http://localhost:5000/api/news/deletenews/${newsId}`);
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
    setCatagary('');
  };

  return (
    <div style={{background:'linear-gradient(to right, #ff8c00, #ff2d00)'}}>
        <div className='adminBox '>
      <h1>{update ? 'Update News' : 'Add News'}</h1>
      <form className='adminForm'>
      <table>
        <tr>
            <td className='label'>Category:</td>
            <td><input type="text" value={catagary} onChange={(e) => setCatagary(e.target.value)} required /></td>
        </tr>
        <tr>
            <td className='label'>Title:</td>
            <td><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /></td>
        </tr>
        <tr>
            <td className='label'>Body:</td>
            <td><input type="text" value={body} onChange={(e) => setBody(e.target.value)} required /></td>
        </tr>
        <tr>
            <td className='label'>Image:</td>
            <td><input type='file' onChange={(e) => setPhotos(e.target.files[0])}/></td>
        </tr>
        </table>

        <button type="button" onClick={update ? handleUpdateNews : handleAddNews}>
        {update ? 'Update News' : 'Add News'}
        </button>

      </form>
      </div>
      <h2>Display news</h2>
      <div className='news-container'>
        <ul >
          {news.map((data) => (
            <li key={data._id}>
              <h3>{data.title}</h3>
              <br />
              <h3>{data.catagary}</h3>
              <br />
              <p>{data.body}</p>
              <br />
              <div className='newsImage'>
                    <img src={`http://localhost:5000/uploads/${data.photo}`} alt="grid_image" /><br/>
              </div>

              <button type="button" onClick={() => {
                setUpdate(true);
                setCurrentNewsId(data._id);
                setTitle(data.title);
                setBody(data.body);
                setCatagary(data.catagary);
              }}>
                Update
              </button>
              <button type="button" onClick={() => handleDeleteNews(data._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddNews;