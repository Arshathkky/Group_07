<<<<<<< HEAD
import  { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';

const SignOut = () => {
  const navigate = useNavigate();
  const [, setUser] = useContext(UserContext); 

  
  useEffect(() => {
    logOut();
  }, ); 

  const logOut = () => {
    setUser('guest'); 
    navigate('/'); 
  };

  
  return null;
};

export default SignOut;
=======
import React from 'react'
import { useContext } from 'react'
import UserContext from '../../UserContext'
import { useNavigate } from 'react-router-dom'
const SignOut = () => {
    const navigate = useNavigate()
    const values = useContext(UserContext)
    const [,setUser] = values
    
    const logOut = ()=>{
        setUser('guest')
        navigate('/')
    }
  return (
    <div>
       <button type='submit' onClick={logOut}>Touch me to logout</button>
        
    </div>
  )
}

export default SignOut
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be
