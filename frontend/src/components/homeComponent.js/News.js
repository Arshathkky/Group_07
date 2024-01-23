import React ,{useState,useEffect}from 'react'
import axios from 'axios'

const News = () => {
    const [news,setNews] = useState([]);
    const [allchecked ,setAllChecked]= useState(['sport','event','common'])

    useEffect(()=>{
        fetchNews();
    },[]);

    const fetchNews = async ()=>{
        try{
            const response = await axios.get('http://localhost:5000/api/news/getNews');
            setNews(response.data);
        }
        catch(error){
            console.error("Error fetching events: ",error)
        }
    }
    const handleChange = (e) => {
      const category = e.target.value;
      if (e.target.checked) {
        setAllChecked([...allchecked, category]);
      } else {
        console.log('Type of allchecked before filter:', typeof allchecked);
        setAllChecked(allchecked.filter((item) => item !== category));
      }
    }
    
    const filteredNews = news.filter((data)=>allchecked.includes(data.catagary))
  return (
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default News