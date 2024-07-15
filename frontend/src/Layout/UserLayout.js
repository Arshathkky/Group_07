import React, { useContext } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import UserRoutes from '../Routes/UserRoutes';
import UserContext from '../UserContext';

const UserLayout = () => {
  const value = useContext(UserContext);

  // Ensure that value is iterable, typically an array or object that can be destructured
  const [role] = Array.isArray(value) ? value : [value];

  return (
    <div>
      <Header setRole={role}></Header>
      <UserRoutes />
      <Footer></Footer>
    </div>
  );
};

export default UserLayout;
