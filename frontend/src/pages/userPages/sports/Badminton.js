import React from 'react';
import LatestScore from './LatestScore';
import ScheduleList from './ScheduleList'; // Adjust the import path as needed

const Badminton = () => {
  return (
    <div>
      <LatestScore sportName="Badminton" />
      <ScheduleList sportName="Badminton" />
    </div>
  );
}

export default Badminton;
