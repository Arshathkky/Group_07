// src/EventList.js
import './style.css'
import Team1 from '../../Assets/Images/team1.jpg'
import Team2 from '../../Assets/Images/team2.jpg'
import headline from '../../Assets/Images/heading_line.png'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [recentEvent, setRecentEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/event/getEvent');
        setEvents(response.data);
        const allEvents = response.data;

      // Get the current date in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
      const currentDate = new Date().toISOString();

      // Filter events that occur after the current date
      const futureEvents = allEvents.filter((event) => event.date > currentDate);

      // Sort events by date to find the most recent event happening after today
      const sortedFutureEvents = futureEvents.sort((a, b) => a.date.localeCompare(b.date));

      // Set the state with the most recent event happening after today
      setRecentEvent(sortedFutureEvents[0]);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);
  const calculateTimeDifference = () => {
    if (recentEvent) {
      const eventDate = new Date(recentEvent.date);
      const currentDate = new Date();

      const timeDifference = eventDate.getTime() - currentDate.getTime();

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    }

    return null;
  };

  return (
    <div>
     
     <div className='container'>
      <div className='heading'>
          <h1>Upcoming Event</h1>
          <img src={headline} alt='headline'/>
      </div>
      
      <div className='schedulepart'>
      {recentEvent ?( <div className='upcoming'>
          <div className='team'>
              <img src={Team1} alt='team1'></img>
              <h3>FAS WeeK</h3>
              <img src={Team2} alt='team1'></img>
              <ul>
                <li>{calculateTimeDifference().days} Days</li>
                <li>{calculateTimeDifference().hours} Hours</li>
                <li>{calculateTimeDifference().minutes} Minutes</li>
                <li>{calculateTimeDifference().seconds} Second</li>
              </ul>
              
          </div>
        </div>) :(<p>no recent event</p>)}
        
        <div className='schedule'>
          <table className='' >
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{event.sportName}</td>
              <td>{event.date.split('T')[0]}</td>
              <td>{event.teamA}</td>
              <td>vs</td>
              <td>{event.teamB}</td>
            </tr>
          ))}
          </table>
        </div>
      </div>
      
      <div>
      
    
    </div>
    </div>
    </div>
  );
};

export default EventList;