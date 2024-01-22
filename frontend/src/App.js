import React, { useState } from 'react';
import UserLayout from './Layout/UserLayout';  
import AdminLayout from './Layout/AdminLayout';  
import UserContext from './UserContext';
import CoachLayout from './Layout/CoachLayout';

const App = () => {
  const [userRole, setUserRole] = useState('guest');
  
  return (
    <div>
      <UserContext.Provider value={[userRole,setUserRole]}>
        {userRole === 'guest' && <UserLayout />}
        {userRole === 'admin' && <AdminLayout />}
        {userRole === 'coach' && <CoachLayout />}
      </UserContext.Provider>
        
    </div>
  );
};

export default App;