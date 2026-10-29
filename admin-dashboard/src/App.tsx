import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/LoginForm';
import { BayanListPage } from './pages/BayanListPage';
import { DashboardLayout } from './layouts/DashboardLayout';

const App: React.FC = () => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading authentication...</div>;
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<LoginForm isSignUp={true} />} />

        {/* Protected Dashboard Layout */}
        {user && isAdmin ? (
          <Route element={<DashboardLayout />} path="dashboard">
            <Route index element={<BayanListPage />} />
            <Route path="bayans" element={<BayanListPage />} />
            {/* Add other dashboard routes here as needed */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
