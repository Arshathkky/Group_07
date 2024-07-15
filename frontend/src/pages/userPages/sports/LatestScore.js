import React, { useState, useEffect } from 'react';
import team1 from '../../../Assets/Images/team1.jpg';
import team2 from '../../../Assets/Images/team2.jpg';
import headline from '../../../Assets/Images/heading_line.png';

const ScoresList = ({ sportName }) => {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/sports');
      if (!response.ok) {
        throw new Error('Failed to fetch sports data');
      }
      const data = await response.json();
      setSports(data);
    } catch (error) {
      console.error('Error fetching sports data:', error);
    }
  };

  const renderSportsScores = () => {
    const filteredSports = sports.filter(sport => sport.name.toLowerCase() === sportName.toLowerCase());

    return filteredSports.map((sport) => (
      <div className='resultarea' key={sport._id}>
        <div className='heading'>
          <h1>{sport.name} Latest Result</h1>
          <img src={headline} alt='headline' />
        </div>
        <div className='matchup'>
          <h1>{sport.teams[0]?.name}</h1>
          <h1 className='vs'>VS</h1>
          <h1>{sport.teams[1]?.name}</h1>
        </div>
        <div className='teams'>
          <div className={`team ${sport.teams[0]?.totalScore > sport.teams[1]?.totalScore ? 'winner' : ''}`}>
            <img src={team1} alt='team1' />
            <h4>{sport.teams[0]?.totalScore}</h4>
          </div>
          <div className={`team ${sport.teams[1]?.totalScore > sport.teams[0]?.totalScore ? 'winner' : ''}`}>
            <h4>{sport.teams[1]?.totalScore}</h4>
            <img src={team2} alt='team2' />
          </div>
        </div>
        <div className='players'>
          <div className='team teamA'>
            {sport.teams[0]?.players.map((player, playerIndex) => (
              <h5 key={playerIndex}>
                <span>{player.score}</span> {player.name}
              </h5>
            ))}
          </div>
          <div className='team teamB'>
            {sport.teams[1]?.players.map((player, playerIndex) => (
              <h5 key={playerIndex}>
                {player.name} <span>{player.score}</span>
              </h5>
            ))}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      {sports.length === 0 ? <p>Loading...</p> : renderSportsScores()}
    </div>
  );
};

export default ScoresList;
