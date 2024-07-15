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
    axios.post('http://localhost:5000/api/schedules/add', newSchedule)
      .then(response => {
        console.log('New schedule added:', response.data); 
        // You might want to handle the response or redirect to another page
      })
      .catch(error => console.error('Error adding schedule: ', error));
  };
  

  return (
    <div className='AdminContainer '>
      <h2>Add New Practice Session (Admin)</h2>
      <form onSubmit={handleSubmit} className='adminForm'>
      <table>
  <tr>
    <td className='label'>Sport:</td>
    <td><input type="text" name="sport" value={newSchedule.sport} onChange={handleChange} /></td>
  </tr>
  <tr>
    <td className='label'>Start Time:</td>
    <td><input type="datetime-local" name="startTime" value={newSchedule.startTime} onChange={handleChange} /></td>
  </tr>
  <tr>
    <td className='label'>End Time:</td>
    <td><input type="datetime-local" name="endTime" value={newSchedule.endTime} onChange={handleChange} /></td>
  </tr>
  <tr>
    <td className='label'>Coach:</td>
    <td><input type="text" name="coach" value={newSchedule.coach} onChange={handleChange} /></td>
  </tr>
</table>

<button type="submit">Add Session</button>

      </form>
    </div>
  );
};

export default AddSchedule;