import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import DashboardPage from './pages/dashboard/DashboardPage';
import Home from './pages/dashboard/home/Home';
import Statistics from './pages/Statistics'; 
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PrivateRoute from './pages/PriveteRoute'; 
import { refreshUser } from './redux/auth/authActions';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
    const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(refreshUser());
    }
  }, [dispatch, isAuthenticated]);
    return (
        <Router basename={process.env.NODE_ENV!=='production' ? '/' : '/React-Team-Project'}>
            <Routes>
            <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/dashboard" element={<PrivateRoute element={DashboardPage} />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        
                <Route path="/home" element={<Home />} />
                <Route path="/statistics" element={<Statistics />} />

            </Routes>
        </Router>
    );
};

export default App;
