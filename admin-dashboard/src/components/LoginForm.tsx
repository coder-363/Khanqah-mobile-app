import React, { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  isSignUp?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ isSignUp = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(isSignUp);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        await setDoc(doc(db, 'admins', uid), {
          email: userCredential.user.email,
          createdAt: new Date(),
          isAdmin: true
        });

        alert('Account created successfully! Please log in.');
        setIsRegister(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 420,
      margin: '40px auto',
      padding: 30,
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
      textAlign: 'left',
      border: '1px solid #E5E0D8'
    }}>
      <div style={{ textAlign: 'center', marginBottom: 25 }}>
        <h2 style={{ color: '#064E3B', fontSize: 24, marginBottom: 8, fontFamily: 'serif' }}>خانقاہ جاویدیہ</h2>
        <p style={{ color: '#78716C', fontSize: 14 }}>{isRegister ? 'Create Admin Account' : 'Admin Dashboard Portal'}</p>
      </div>

      {error && (
        <div style={{ backgroundColor: '#FEE2E2', color: '#B91C1C', padding: 12, borderRadius: 8, fontSize: 13, marginBottom: 20 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: '600', color: '#1C1917', marginBottom: 6 }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@khanqah.com"
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              color: '#000000', // Explicit black text
              backgroundColor: '#F9FAFB',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: '600', color: '#1C1917', marginBottom: 6 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid #D1D5DB',
              fontSize: 14,
              color: '#000000', // Explicit black text
              backgroundColor: '#F9FAFB',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: 14,
            backgroundColor: '#064E3B',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 8,
            fontSize: 15,
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)'
          }}
        >
          {loading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Sign In')}
        </button>
      </form>

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          style={{
            background: 'none',
            border: 'none',
            color: '#D97706',
            fontSize: 13,
            cursor: 'pointer',
            fontWeight: '500',
            textDecoration: 'underline'
          }}
        >
          {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};