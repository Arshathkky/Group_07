// src/AddEventForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEvents = () => {
  const [title, setTitle] = useState('');
  const [sportName, setSport] = useState('');
  const [date, setDate] = useState('');
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [events, setEvents] = useState([]);
 
  useEffect(() => {
    // Fetch events from the server on component mount
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/event/getEvent'); // Update with your backend server URL
      setEvents(response.data);
      

    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEvent = async () => {
    try {
      await axios.post('http://localhost:5000/api/event/addEvent', { title,sportName, date, teamA, teamB }); // Update with your backend server URL
      alert('Event added successfully');
      clearForm();
      fetchEvents(); // Fetch updated list of events
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event. Please try again.');
    }
  };

  const handleUpdateEvent = async (eventId) => {
    try {
      await axios.put(`http://localhost:5000/api/event/updateEvent/${eventId}`, { title, date, teamA, teamB }); // Update with your backend server URL
      alert('Event updated successfully');
      
      clearForm();
      fetchEvents(); // Fetch updated list of events
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error updating event. Please try again.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/event/deleteEvent/${eventId}`); // Update with your backend server URL
      alert('Event deleted successfully');
      fetchEvents(); // Fetch updated list of events
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event. Please try again.');
    }
  };

  const clearForm = () => {
    setTitle('');
    setSport('');
    setDate('');
    setTeamA('');
    setTeamB('');
  };

  return (
    <div className='adminBox'>
      <h1>Add Event</h1>
      <form className='adminForm'>
      <table>
  <tr>
    <td className='label'>Title:</td>
    <td><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /></td>
  </tr>
  <tr>
    <td className='label'>Sport Name:</td>
    <td><input type="text" value={sportName} onChange={(e) => setSport(e.target.value)} required /></td>
  </tr>
  <tr>
    <td className='label'>Date:</td>
    <td><input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></td>
  </tr>
  <tr>
    <td className='label'>Team A</td>
    <td><input type="text" value={teamA} onChange={(e) => setTeamA(e.target.value)} required /></td>
  </tr>
  <tr>
    <td className='label'>Team B:</td>
    <td><input type="text" value={teamB} onChange={(e) => setTeamB(e.target.value)} required /></td>
  </tr>
</table>

        <h2>Events List</h2>
        <ul>
          {events.map((event) => (
            <li key={event.id} >
              {event.title} - {event.date}
              <button type="button" onClick={() => handleUpdateEvent(event._id)}>
                Update
              </button>
              <button type="button" onClick={() => handleDeleteEvent(event._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        
      
      </form>
    </div>
  );
};

export default AddEvents;
