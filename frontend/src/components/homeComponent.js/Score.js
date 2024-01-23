import React, { useEffect, useState } from 'react';
import axios from 'axios';
import team1 from '../../Assets/Images/team1.jpg';
import team2 from '../../Assets/Images/team2.jpg';
import headline from '../../Assets/Images/heading_line.png';
import './style.css';

const ScoresList = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios.get('http://localhost:5000/api/getLatest')
        .then(response => {
            console.log('Response data:', response.data);
            setScores(response.data);
        })
        .catch(error => {
            console.error('Error fetching scores:', error);
        });
}, []);

  const displayScore = scores.length > 0 ? (
    scores.map(score => (
      <div className='resultarea' key={score._id}>
        <div className='heading'>
          <h1>Latest result</h1>
          <img src={headline} alt='headline' />
        </div>
        <div className='team'>
          <div className='teamA'>
            <img src={team1} alt='team1' />
            <h4>{score.teamoneName}</h4>
            <h5>{score.teamoneplayeroneName} :{score.teamoneplayeroneScore}</h5>
            <h5>{score.teamoneplayertwoName} : {score.teamoneplayertwoScore}</h5>
          </div>
          <div className='result'>
            <h1>{score.teamoneScore}</h1>
            <h1>:</h1>
            <h1>{score.teamtwoScore}</h1>
          </div>
          <div className='teamB'>
            <img src={team2} alt='team2' />
            <h4>{score.teamtwoName}</h4>
            <h5>{score.teamtwoplayeroneName} :{score.teamtwoplayeroneScore}</h5>
            <h5>{score.teamtwoplayertwoName} : {score.teamtwoplayertwoScore}</h5>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No scores available</p>
  );

  return (
    <div>
      
      {displayScore}
    </div>
  );
};

export default ScoresList;
