<<<<<<< HEAD
import React, { useContext } from 'react';
import { SportContext } from '../../SportContext';
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be
import team1 from '../../Assets/Images/team1.jpg';
import team2 from '../../Assets/Images/team2.jpg';
import headline from '../../Assets/Images/heading_line.png';
import './style.css';

const ScoresList = () => {
<<<<<<< HEAD
  const { sports, selectedSport } = useContext(SportContext);

  const lastEnteredSport = selectedSport || (sports && sports.length > 0 ? sports[0] : null);

  const displayScore = lastEnteredSport ? (
    <div className='resultarea' key={lastEnteredSport._id}>
      <div className='heading'>
        <h1>{lastEnteredSport.name} Latest Result</h1>
        <img src={headline} alt='headline' />
      </div>
      <div className='matchup'>
        <h1>{lastEnteredSport.teams[0]?.name}</h1>
        <h1 className='vs'>VS</h1>
        <h1>{lastEnteredSport.teams[1]?.name}</h1>
      </div>
      <div className='teams'>
        <div className={`team ${lastEnteredSport.teams[0]?.totalScore > lastEnteredSport.teams[1]?.totalScore ? 'winner' : ''}`}>
          <img src={team1} alt='team1' />
          <h4>{lastEnteredSport.teams[0]?.totalScore}</h4>
        </div>
        <div className={`team ${lastEnteredSport.teams[1]?.totalScore > lastEnteredSport.teams[0]?.totalScore ? 'winner' : ''}`}>
          <h4>{lastEnteredSport.teams[1]?.totalScore}</h4>
          <img src={team2} alt='team2' />
        </div>
      </div>
      <div className='players'>
        <div className='team teamA'>
          {lastEnteredSport.teams[0]?.players.map((player, playerIndex) => (
            <h5 key={playerIndex}>
              <span>{player.score}</span> {player.name}
            </h5>
          ))}
        </div>
        <div className='team teamB'>
          {lastEnteredSport.teams[1]?.players.map((player, playerIndex) => (
            <h5 key={playerIndex}>
              {player.name} <span>{player.score}</span>
            </h5>
          ))}
        </div>
      </div>
    </div>
=======
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
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be
  ) : (
    <p>No scores available</p>
  );

  return (
    <div>
<<<<<<< HEAD
=======
      
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be
      {displayScore}
    </div>
  );
};

export default ScoresList;
