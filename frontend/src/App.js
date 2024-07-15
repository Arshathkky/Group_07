import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import UserLayout from './Layout/UserLayout';  
import AdminLayout from './Layout/AdminLayout';  
import UserContext from './UserContext';
import CoachLayout from './Layout/CoachLayout';

const socket = io('http://localhost:5000');

const App = () => {
  const [userRole, setUserRole] = useState('guest');

  useEffect(() => {
    socket.on('update', (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  
  return (
    <div>
      <UserContext.Provider value={[userRole, setUserRole]}>
        {userRole === 'guest' && <UserLayout />}
        {userRole === 'admin' && <AdminLayout />}
        {userRole === 'coach' && <CoachLayout />}
      </UserContext.Provider>
    </div>
  );
};

export default App;
