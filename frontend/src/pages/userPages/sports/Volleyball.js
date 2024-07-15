import React from 'react';
import LatestScore from './LatestScore';
import ScheduleList from './ScheduleList'; // Adjust the import path as needed

const Volleyball = () => {
  return (
    <div>
      <LatestScore sportName="Volleyball" />
      <ScheduleList sportName="Volleyball" />
    </div>
  );
}

export default Volleyball;
