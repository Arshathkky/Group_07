import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Football = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        // Fetch schedules from the backend when the component mounts
        axios.get('http://localhost:5000/api/schedules')
            .then(response => {
                const footballSchedules = response.data.filter(schedule => schedule.sport.toLowerCase() === 'football');
            setSchedules(footballSchedules);
            })
            
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
}

export default Football
