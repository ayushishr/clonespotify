import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isTokenValid } from './utils/auth';
import LoginPage from './pages/LoginPage';
import CallbackPage from './pages/CallbackPage';
import DashboardPage from './pages/DashboardPage';

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  return isTokenValid() ? <>{element}</> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isTokenValid() ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/callback" element={<CallbackPage />} />
      
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute element={<DashboardPage />} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;