import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/Pages/Home'; 
import Statistics from '../components/Pages/Statistics'; 

export const App = () => {
    return (
        <Router basename='/React-Team-Project'>
            <Routes>
                <Route path="/" element={<Home />}>
                  <Route path="/statistics" element={<Statistics />} />
                </Route>
                
            </Routes>
        </Router>
    );
};
