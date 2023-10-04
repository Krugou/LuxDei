import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Logout = (props) => {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(null);
    localStorage.removeItem('userToken');
  }, []);
  return <Navigate to='/' />;
};

export default Logout;
