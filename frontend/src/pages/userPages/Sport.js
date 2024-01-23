// src/components/ScheduleList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sport = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        // Fetch schedules from the backend when the component mounts
        axios.get('http://localhost:3001/schedules')
            .then(response => setSchedules(response.data))
            .catch(error => console.error('Error fetching schedules: ', error));
    }, []);

    return (
        <div>
            <h2>Schedule List</h2>
            <ul>
                {schedules.map(schedule => (
                    <li key={schedule._id}>
                        {schedule.sport} -  {schedule.startTime} - {schedule.endTime} - {schedule.coach}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sport;
