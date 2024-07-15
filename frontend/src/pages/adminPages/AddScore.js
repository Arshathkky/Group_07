import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { SportContext } from '../../SportContext'; // Adjust the path as necessary
import './AdminStyle.css';

const customStyles = {
  content: {
    maxHeight: '80vh',
    overflowY: 'auto',
  },
};

const Admin = () => {
  const { sports, setSelectedSport, selectedSport } = useContext(SportContext);
  const [newSportName, setNewSportName] = useState('');
  const [newSportType, setNewSportType] = useState('');
  const [numPlayers, setNumPlayers] = useState('');
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerInputs, setPlayerInputs] = useState({ teamA: [], teamB: [] });
  const [winningTeam, setWinningTeam] = useState('');

  useEffect(() => {
    if (selectedSport) {
      setTeamA('');
      setTeamB('');
      setTeamAPlayers(Array(selectedSport.numPlayers).fill({ name: '', score: 0 }));
      setTeamBPlayers(Array(selectedSport.numPlayers).fill({ name: '', score: 0 }));
      setPlayerInputs({
        teamA: Array(selectedSport.numPlayers).fill(''),
        teamB: Array(selectedSport.numPlayers).fill(''),
      });
    }
  }, [selectedSport]);

  const handleAddSport = async () => {
    try {
      const teams = newSportType === 'team' ? [] : null;
      await axios.post('http://localhost:5000/api/sports', { name: newSportName, type: newSportType, teams, numPlayers });
      setNewSportName('');
      setNewSportType('');
      setNumPlayers('');
    } catch (err) {
      console.error('Error adding sport:', err);
    }
  };

  const handleDeleteSport = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sports/${id}`);
    } catch (err) {
      console.error('Error deleting sport:', err);
    }
  };

  const handleSelectSport = (sport) => {
    setSelectedSport(sport);
    setIsModalOpen(true);
  };

  const handlePlayerNameChange = (team, index, value) => {
    const newInputs = { ...playerInputs };
    newInputs[team][index] = value;
    setPlayerInputs(newInputs);
  };

  const handleModalSubmit = () => {
    setTeamAPlayers(playerInputs.teamA.map(name => ({ name, score: 0 })));
    setTeamBPlayers(playerInputs.teamB.map(name => ({ name, score: 0 })));
    setIsModalOpen(false);
  };

  const handlePlayerChange = (team, index, field, value) => {
    const updatedPlayers = team === 'A' ? [...teamAPlayers] : [...teamBPlayers];
    const otherTeamPlayers = team === 'A' ? teamBPlayers : teamAPlayers;
    const validatedScore = parseInt(value) < 0 ? 0 : parseInt(value);
  
    // Custom validation rules for each sport
    let maxScore;
    switch (selectedSport.name.toLowerCase()) {
      case 'badminton':
      case 'chess':
        maxScore = 1;
        break;
      case 'football':
        maxScore = 90;
        break;
      case 'volleyball':
      case 'table tennis':
        maxScore = 25;
        break;
      case 'carrom':
        maxScore = 29;
        break;
      case 'basketball':
      case 'athletics':
        maxScore = 100;
        break;
      default:
        maxScore = validatedScore;
        break;
    }
  
    // Ensure only one player in either team can reach the maximum score for the given index
    if (validatedScore === maxScore && otherTeamPlayers[index].score === maxScore) {
      alert(`Only one player in each index can have the maximum score of ${maxScore}`);
      return;
    }
  
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: validatedScore > maxScore ? maxScore : validatedScore
    };
  
    team === 'A' ? setTeamAPlayers(updatedPlayers) : setTeamBPlayers(updatedPlayers);
  };

  const getTotalScore = (teamPlayers) => {
    return teamPlayers.reduce((total, player) => total + (parseInt(player.score) || 0), 0);
  };

  const determineWinningTeam = () => {
    const totalScoreA = getTotalScore(teamAPlayers);
    const totalScoreB = getTotalScore(teamBPlayers);

    if (totalScoreA > totalScoreB) {
      setWinningTeam(teamA);
    } else if (totalScoreB > totalScoreA) {
      setWinningTeam(teamB);
    } else {
      setWinningTeam('Tie');
    }
  };

  const handleSubmitScores = async () => {
    try {
      if (selectedSport.type === 'team') {
        const updatedSport = {
          ...selectedSport,
          teams: [
            { name: teamA, players: teamAPlayers, totalScore: getTotalScore(teamAPlayers) },
            { name: teamB, players: teamBPlayers, totalScore: getTotalScore(teamBPlayers) },
          ],
        };
        await axios.put(`http://localhost:5000/api/sports/${selectedSport._id}`, updatedSport);
      } else {
        const updatedSport = { ...selectedSport, players: teamAPlayers };
        await axios.put(`http://localhost:5000/api/sports/${selectedSport._id}`, updatedSport);
      }
      setSelectedSport(null);
      determineWinningTeam();
    } catch (err) {
      console.error('Error submitting scores:', err);
    }
  };

  return (
    <div className="AdminContainer">
      <h2>Admin Panel</h2>
      <div className="form-group">
        <label>New Sport Name:</label>
        <input
          type="text"
          className="form-control"
          value={newSportName}
          onChange={(e) => setNewSportName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Type:</label>
        <select
          className="form-control"
          value={newSportType}
          onChange={(e) => setNewSportType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="team">Team</option>
          <option value="individual">Individual</option>
        </select>
      </div>
      <div className="form-group">
        <label>Number of Players:</label>
        <input
          type="number"
          className="form-control"
          value={numPlayers}
          onChange={(e) => setNumPlayers(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddSport}>Add Sport</button>

      <h3>Available Sports</h3>
      <ul>
        {sports.map((sport) => (
          <li key={sport._id}>
            {sport.name} ({sport.type})
            <button onClick={() => handleSelectSport(sport)}>Select</button>
            <button onClick={() => handleDeleteSport(sport._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedSport && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={customStyles}
        >
          <h2>{selectedSport.name} Setup</h2>
          {selectedSport.type === 'team' && (
            <>
              <div className="form-group">
                <label>Team A:</label>
                <input
                  type="text"
                  className="form-control"
                  value={teamA}
                  onChange={(e) => setTeamA(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Team B:</label>
                <input
                  type="text"
                  className="form-control"
                  value={teamB}
                  onChange={(e) => setTeamB(e.target.value)}
                />
              </div>
            </>
          )}
          {['A', 'B'].map((team) => (
            <div key={team}>
              <h4>Team {team} Players</h4>
              {Array.from({ length: selectedSport.numPlayers }).map((_, i) => (
                <div className="form-group" key={i}>
                  <label>Player {i + 1}:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={playerInputs[`team${team}`][i]}
                    onChange={(e) => handlePlayerNameChange(`team${team}`, i, e.target.value)}
                  />
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleModalSubmit}>Submit Players</button>
        </Modal>
      )}

      {selectedSport && (
        <>
          <h3>Submit Scores for {selectedSport.name}</h3>
          {selectedSport.type === 'team' ? (
            <div className="score-row">
              <div>
                <h4>{teamA}</h4>
                {teamAPlayers.map((player, i) => (
                  <div key={i} className="form-group score-input">
                    <label>{player.name}:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={player.score}
                      onChange={(e) => handlePlayerChange('A', i, 'score', e.target.value)}
                    />
                  </div>
                ))}
                <div>Total Score: {getTotalScore(teamAPlayers)}</div>
              </div>
              <div>
                <h4>{teamB}</h4>
                {teamBPlayers.map((player, i) => (
                  <div key={i} className="form-group score-input">
                    <label>{player.name}:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={player.score}
                      onChange={(e) => handlePlayerChange('B', i, 'score', e.target.value)}
                    />
                  </div>
                ))}
                <div>Total Score: {getTotalScore(teamBPlayers)}</div>
              </div>
            </div>
          ) : (
            teamAPlayers.map((player, i) => (
              <div key={i} className="form-group score-input">
                <label>{player.name}:</label>
                <input
                  type="number"
                  className="form-control"
                  value={player.score}
                  onChange={(e) => handlePlayerChange('A', i, 'score', e.target.value)}
                />
              </div>
            ))
          )}
          <div>
            <button className="btn btn-primary" onClick={handleSubmitScores}>Submit Scores</button>
            {winningTeam && (
              <div>
                <h3>Winning Team: {winningTeam}</h3>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
