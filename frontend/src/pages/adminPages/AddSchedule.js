// src/components/AdminScheduleForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddSchedule = () => {
  const [newSchedule, setNewSchedule] = useState({
    sport: '',
    
    startTime: '',
    endTime: '',
    coach: '',
    
  });

  const handleChange = (e) => {
    setNewSchedule({ ...newSchedule, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to add a new schedule
    axios.post('http://localhost:3001/schedules/add', newSchedule)
      .then(response => {
        console.log('New schedule added:', response.data); 
        // You might want to handle the response or redirect to another page
      })
      .catch(error => console.error('Error adding schedule: ', error));
  };
  

  return (
    <div>
      <h2>Add New Practice Session (Admin)</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Sport:
          <input type="text" name="sport" value={newSchedule.sport} onChange={handleChange} />
        </label>
        
        <label>
          Start Time:
          <input type="datetime-local" name="startTime" value={newSchedule.startTime} onChange={handleChange} />
        </label>
        <label>
          End Time:
          <input type="datetime-local" name="endTime" value={newSchedule.endTime} onChange={handleChange} />
        </label>
        <label>
          Coach:
          <input type="text" name="coach" value={newSchedule.coach} onChange={handleChange} />
        </label>
        
        <button type="submit">Add Practice Session</button>
      </form>
    </div>
  );
};

export default AddSchedule;