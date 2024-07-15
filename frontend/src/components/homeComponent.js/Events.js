import './style.css';
import Team1 from '../../Assets/Images/team1.jpg';
import Team2 from '../../Assets/Images/team2.jpg';
import headline from '../../Assets/Images/heading_line.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [recentEvent, setRecentEvent] = useState(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [intervalId, setIntervalId] = useState(null);

  // Function to calculate time difference
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

    return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Return default values if no recent event
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/event/getEvent');
        setEvents(response.data);
        const allEvents = response.data;

        const currentDate = new Date().toISOString();
        const futureEvents = allEvents.filter((event) => event.date > currentDate);
        const sortedFutureEvents = futureEvents.sort((a, b) => a.date.localeCompare(b.date));

        setRecentEvent(sortedFutureEvents[0]);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

    socket.on('eventUpdated', () => {
      fetchEvents();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (recentEvent) {
      const interval = setInterval(() => {
        setCountdown(calculateTimeDifference());
      }, 1000);

      setIntervalId(interval);

      return () => {
        clearInterval(interval);
      };
    }
  }, [recentEvent]);

  return (
    <div>
      <div className='container'>
        <div className='heading'>
          <h1>Upcoming Event</h1>
          <img src={headline} alt='headline' />
        </div>

        <div className='schedulepart'>
          {recentEvent ? (
            <div className='upcoming'>
              <div className='team'>
                <img src={Team1} alt='team1'></img>
                <h3>{recentEvent.title}</h3>
                <img src={Team2} alt='team2'></img>
                <ul>
                  <li>{countdown.days} Days</li>
                  <li>{countdown.hours} Hours</li>
                  <li>{countdown.minutes} Minutes</li>
                  <li>{countdown.seconds} Seconds</li>
                </ul>
              </div>
            </div>
          ) : (
            <p>No recent event</p>
          )}

          <div className='schedule'>
            <table>
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
      </div>
    </div>
  );
};

export default EventList;
