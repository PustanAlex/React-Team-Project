import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard/DashboardPage';
import Home from './pages/dashboard/home/Home';
import Statistics from './pages/Statistics'; 

export const App = () => {
    return (
        <Router basename={process.env.NODE_ENV!=='production' ? '/' : '/React-Team-Project'}>
            <Routes>
                <Route path="/" element={<DashboardPage />}>
                  <Route index element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/statistics" element={<Statistics />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
