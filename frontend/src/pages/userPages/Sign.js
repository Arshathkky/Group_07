
import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../../UserContext';
import { Link,  } from 'react-router-dom';


const Sign = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const values = useContext(UserContext)
    const [user,setUser] = values
    const navigate = useNavigate();
    
      const handleLogin = async () => {
        try {
          const result = await axios.post('http://localhost:5000/api/role/add', {
            username,
            password,
          });
          setUser(result.data.role); 
          console.log(result.data.role);
          navigate('/home');
          
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div>
    <h1>Welcome to the Login Page</h1>       
      
      <div>
    <label>Username: </label>
    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    <br />
    <label>Password: </label>
    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
    <br />
    <button onClick={handleLogin}>Login</button>
      </div>
  </div>
  );
};

export default Sign;