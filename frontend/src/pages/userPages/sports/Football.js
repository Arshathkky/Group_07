import React from 'react';
import LatestScore from './LatestScore';
import ScheduleList from './ScheduleList'; // Adjust the import path as needed

const Football = () => {
  return (
    <div>
      <LatestScore sportName="Football" />
      <ScheduleList sportName="Football" />
    </div>
  );
}

export default Football;
