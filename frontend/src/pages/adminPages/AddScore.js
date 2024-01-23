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
      )}
    </div>
  );
};

export default Admin;
