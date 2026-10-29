import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import BayanForm from '../components/BayanForm';

// Define Bayan interface locally to avoid import path issues
interface Bayan {
  id: string;
  title: string;
  description: string;
  mediaUrl?: string;
  speaker?: string;
  date?: string;
}

// A simpler type for the state
interface BayanState {
  id: string;
  title: string;
  description: string;
  mediaUrl?: string;
  speaker?: string;
  date?: string;
}

export const BayanListPage: React.FC = () => {
  const { user } = useAuth();
  const [bayans, setBayans] = useState<BayanState[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch bayans from Firestore
  useEffect(() => {
    const fetchBayans = async () => {
      const q = query(collection(db, 'bayans'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as BayanState);
      setBayans(data);
      setLoading(false);
    };

    fetchBayans();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this Bayan?')) {
      setDeleteId(id);
    }
  };

  const confirmDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'bayans', id));
      alert('Bayan deleted successfully.');
      setDeleteId(null);
      // Refresh the list
      const q = query(collection(db, 'bayans'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as BayanState);
      setBayans(data);
    } catch (err: any) {
      console.error(err);
      alert('Failed to delete bayan.');
    }
  };

  if (loading) {
    return <div style={{ padding: 20, textAlign: 'center' }}>Loading bayans...</div>;
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 20 }}>Manage Bayans</h2>

      {/* List of Bayans */}
      <div>
        {bayans.length === 0 ? (
          <p style={{ color: '#78716C' }}>No bayans found. Add one above.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {bayans.map((bayan) => (
              <li key={bayan.id} style={{ marginBottom: 15, background: '#FFF', padding: 15, borderRadius: 8, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                <div style={{ fontWeight: 'bold', fontSize: 16, color: '#122B48' }}>{bayan.title}</div>
                <div style={{ fontSize: 13, color: '#78716C', marginTop: 4 }}>{bayan.speaker || 'Unknown'} • {bayan.date || 'No date'}</div>
                <div style={{ marginTop: 8, fontSize: 12, color: '#D97706' }}>
                  {bayan.mediaUrl ? <a href={bayan.mediaUrl} target="_blank" rel="noopener" style={{ color: '#D97706', textDecoration: 'underline' }}>▶ View Media</a> : 'No media link'}
                </div>
                <button
                  style={{
                    marginTop: 8,
                    backgroundColor: '#E53935',
                    color: '#FFF',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: 4,
                    float: 'right',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleDelete(bayan.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Bayan Form */}
      <div style={{ marginTop: 30, background: '#FFF', padding: 20, borderRadius: 8, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <h4 style={{ marginTop: 0, marginBottom: 15 }}>✏️ Add New Bayan</h4>
        <BayanForm onSuccess={() => fetchBayans()} />
      </div>
    </div>
  );
};