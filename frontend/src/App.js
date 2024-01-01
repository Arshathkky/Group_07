// App.js
import React, { useState } from 'react';
import UserLayout from './Layout/UserLayout';  // Corrected import
import AdminLayout from './Layout/AdminLayout';  // Corrected import
import LoginForm from './Login/LoginForm';

const App = () => {
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    setUserRole(role);
  };

  return (
    <div>
      {userRole === 'guest' && <UserLayout />}
      {userRole === 'admin' && <AdminLayout />}
      {userRole === '' && <LoginForm onLogin={handleLogin} />}  {/* Corrected component name */}
    </div>
  );
};

export default App;