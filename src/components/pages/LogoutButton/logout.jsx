// logout.js

import axios from 'axios';
import { clearToken } from '../apiAuth';

const logout = async () => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.delete('https://wallet.b.goit.study/api/auth/sign-out', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      clearToken(); 
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };
  

export default logout;
