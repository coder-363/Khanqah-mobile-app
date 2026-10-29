import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(true); // Temporarily set to true for easy development access
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      // For development, we set isAdmin to true if user is logged in
      setIsAdmin(!!user);
    });

    return () => unsubscribe();
  }, []);

  return { user, isAdmin, loading };
};
