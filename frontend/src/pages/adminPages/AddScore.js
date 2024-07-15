<<<<<<< HEAD
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
=======
import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState({
    sportName: '',
    teamoneName: '',
    teamoneScore: 0,
    teamtwoName: '',
    teamtwoScore: 0,
    teamoneplayeroneName: '',
    teamoneplayeroneScore: 0,
    teamoneplayertwoName: '',
    teamoneplayertwoScore: 0,
    teamtwoplayeroneName: '',
    teamtwoplayeroneScore: 0,
    teamtwoplayertwoName: '',
    teamtwoplayertwoScore: 0,
    
  });
  const [scores, setScores] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedScoreId, setSelectedScoreId] = useState(null);

  useEffect(() => {
    // Fetch scores data when the component mounts
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getScore');
      setScores(response.data);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/addScore', formData);
      console.log('Score added successfully!');
    } catch (error) {
      console.error('Error adding score:', error);
    }
  };
  const handleUpdate = (scoreId) => {
    // Show the update form and set the selected score ID
    setShowUpdateForm(true);
    setSelectedScoreId(scoreId);
  };

  const handleCancelUpdate = () => {
    // Hide the update form and reset the selected score ID
    setShowUpdateForm(false);
    setSelectedScoreId(null);
    // Clear the form fields
    
  };

  const handleUpdateSubmit = async () => {
    try {
      // Fetch the details of the selected score
      const response = await axios.get(`http://localhost:5000/api/getScore/${selectedScoreId}`);
      const selectedScore = response.data;

      // Update the score details in the database
      await axios.put(`http://localhost:5000/api/updateScore/${selectedScoreId}`, formData);
      console.log('Update successful');

      // Hide the update form, reset the selected score ID, and fetch the updated scores
      setShowUpdateForm(false);
      setSelectedScoreId(null);
      fetchScores();
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const handleDelete = async (scoreId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/deleteScore/${scoreId}`);
      console.log('Delete successful:', response.data);
      // After deleting a score, fetch the updated scores
      fetchScores();
    } catch (error) {
      console.error('Error deleting score:', error);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  return (
    <div>
      <h2>Admin Page</h2>
      <form onSubmit={handleSubmit}> 
        {/* Add input fields corresponding to your schema */}
        <label>
          Sport Name:
          <input type="text" name="sportName" value={formData.sportName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Team One Name:
          <input type="text" name="teamoneName" value={formData.teamoneName} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team One Score:
          <input type="number" name="teamoneScore" value={formData.teamoneScore} onChange={handleChange} />
        </label>
        <br />



        <label>
          Team Two Name:
          <input type="text" name="teamtwoName" value={formData.teamtwoName} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team Two Score:
          <input type="number" name="teamtwoScore" value={formData.teamtwoScore} onChange={handleChange} />
        </label>
        <br />
        <label>
          Team One Player One Name:
          <input type="text" name="teamoneplayeroneName" value={formData.teamoneplayeroneName} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team One Player One Score:
          <input type="number" name="teamoneplayeroneScore" value={formData.teamoneplayeroneScore} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team One Player Two Name:
          <input type="text" name="teamoneplayertwoName" value={formData.teamoneplayertwoName} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team One Player Two Score:
          <input type="number" name="teamoneplayertwoScore" value={formData.teamoneplayertwoScore} onChange={handleChange} />
        </label>
        <br />
        <label>
          Team Two Player One Name:
          <input type="text" name="teamtwoplayeroneName" value={formData.teamtwoplayeroneName} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team Two Player One Score:
          <input type="number" name="teamtwoplayeroneScore" value={formData.teamtwoplayeroneScore} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team Two Player Two Name:
          <input type="text" name="teamtwoplayertwoName" value={formData.teamtwoplayertwoName} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team Two Player Two Score:
          <input type="number" name="teamtwoplayertwoScore" value={formData.teamtwoplayertwoScore} onChange={handleChange} />
        </label>
        <br />
        
        <button type="submit">{showUpdateForm ? 'Update Score' :'Add score'}</button>
      </form>
      <h3>Scores List</h3>
      <ul>
        {scores.map((score) => (
          <li key={score._id}>
            {/* Display score information */}
            {score.sportName} - {score.teamoneName} vs {score.teamtwoName}<br/>
            <h3>{score.teamoneScore} : {score.teamtwoScore}</h3>
            <button onClick={() => handleUpdate(score._id)}>Update</button>
            <button onClick={() => handleDelete(score._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {showUpdateForm && (
        <div>
          <h3>Update Score</h3>
          <form>
          <label>
          Sport Name:
          <input type="text" name="sportName" value={formData.sportName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Team One Name:
          <input type="text" name="teamoneName" value={formData.teamoneName} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team One Score:
          <input type="number" name="teamoneScore" value={formData.teamoneScore} onChange={handleChange} />
        </label>
        <br />



        <label>
          Team Two Name:
          <input type="text" name="teamtwoName" value={formData.teamtwoName} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team Two Score:
          <input type="number" name="teamtwoScore" value={formData.teamtwoScore} onChange={handleChange} />
        </label>
        <br />
        <label>
          Team One Player One Name:
          <input type="text" name="teamoneplayeroneName" value={formData.teamoneplayeroneName} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team One Player One Score:
          <input type="number" name="teamoneplayeroneScore" value={formData.teamoneplayeroneScore} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team One Player Two Name:
          <input type="text" name="teamoneplayertwoName" value={formData.teamoneplayertwoName} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team One Player Two Score:
          <input type="number" name="teamoneplayertwoScore" value={formData.teamoneplayertwoScore} onChange={handleChange} />
        </label>
        <br />
        <label>
          Team Two Player One Name:
          <input type="text" name="teamtwoplayeroneName" value={formData.teamtwoplayeroneName} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team Two Player One Score:
          <input type="number" name="teamtwoplayeroneScore" value={formData.teamtwoplayeroneScore} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team Two Player Two Name:
          <input type="text" name="teamtwoplayertwoName" value={formData.teamtwoplayertwoName} onChange={handleChange} />
        </label>
        <br />

        <label>
          Team Two Player Two Score:
          <input type="number" name="teamtwoplayertwoScore" value={formData.teamtwoplayertwoScore} onChange={handleChange} />
        </label>
        <br />
            <button type="button" onClick={handleUpdateSubmit}>
              Update Score
            </button>
            <button type="button" onClick={handleCancelUpdate}>
              Cancel
            </button>
          </form>
        </div>
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be
      )}
    </div>
  );
};

export default Admin;
