import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export const DashboardLayout: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  if (!user || !isAdmin) {
    // If not admin, redirect to login
    return null; // The App.tsx handles the Navigate now
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 250, backgroundColor: '#064E3B', color: '#FFF', minHeight: '100vh', padding: 20, boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: 20, textAlign: 'center', color: '#D97706', fontSize: 24 }}>Admin Panel</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: 15 }}>
              <a href="/dashboard" style={{ color: '#FFF', textDecoration: 'none', fontWeight: '500', display: 'block', padding: '8px 10px', borderRadius: 5, transition: 'background-color 0.2s' }}>
                <span style={{ fontSize: 20, marginRight: 10 }}>📊</span> Dashboard
              </a>
            </li>
            <li style={{ marginBottom: 15 }}>
              <a href="/dashboard/bayans" style={{ color: '#FFF', textDecoration: 'none', fontWeight: '500', display: 'block', padding: '8px 10px', borderRadius: 5, transition: 'background-color 0.2s' }}>
                <span style={{ fontSize: 20, marginRight: 10 }}>📖</span> Bayans
              </a>
            </li>
            {/* Add more nav items for other content types (Nazmain, Tafseer, etc.) as needed */}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: 30, backgroundColor: '#FAF7F2', display: 'flex', flexDirection: 'column' }}>
        <header style={{ marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid #E5E0D8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 28, color: '#122B48', margin: 0 }}>Khanaqah Admin Panel</h1>
            <p style={{ color: '#78716C', fontSize: 14, margin: '5px 0 0 0' }}>Welcome, {user?.email || 'Admin'}</p>
          </div>
          <div>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: '1px solid #D97706',
                color: '#D97706',
                fontSize: 14,
                padding: '8px 15px',
                borderRadius: 5,
                cursor: 'pointer',
                transition: 'background-color 0.2s, color 0.2s'
              }}
            >
              Logout
            </button>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};