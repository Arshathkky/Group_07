import React, { useContext } from 'react';
import { SportContext } from '../../SportContext';
import team1 from '../../Assets/Images/team1.jpg';
import team2 from '../../Assets/Images/team2.jpg';
import headline from '../../Assets/Images/heading_line.png';
import './style.css';

const ScoresList = () => {
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
