import React from 'react';
import ScheduleList from './ScheduleList';
import LatestScore from './LatestScore';

const Cricket = () => {
    return (
        <div>

        <LatestScore sportName="Cricket" />
        <ScheduleList sportName="Cricket" />
        </div>
    );
}

export default Cricket;
