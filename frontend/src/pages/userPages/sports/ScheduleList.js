import axios from 'axios';
import React, { useState, useEffect } from 'react';
 // Ensure this file contains the common styles

const ScheduleList = ({ sportName }) => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        // Fetch schedules from the backend when the component mounts
        axios.get('http://localhost:5000/api/schedules')
            .then(response => {
                // Filter schedules for the given sport
                const sportSchedules = response.data.filter(schedule => schedule.sport.toLowerCase() === sportName.toLowerCase());
                setSchedules(sportSchedules);
            })
            .catch(error => console.error('Error fetching schedules: ', error));
    }, [sportName]);

    return (
        <div className='schedules-container'>
            <h2>{sportName} Schedule</h2>
            <table className='schedules-table'>
                <thead>
                    <tr>
                        <th>Sport</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Coach</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => (
                        <tr key={schedule._id}>
                            <td>{schedule.sport}</td>
                            <td>{schedule.startTime}</td>
                            <td>{schedule.endTime}</td>
                            <td>{schedule.coach}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ScheduleList;
