

import React from 'react';
import { useDispatch } from 'react-redux';
import logout from './logout'; 

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout(); 
      
    } catch (error) {
      console.error('Logout failed:', error);
      
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
