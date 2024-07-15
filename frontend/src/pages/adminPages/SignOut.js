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
