import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface BayanFormProps {
  onSuccess: () => void;
}

export default function BayanForm({ onSuccess }: BayanFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mediaUrl: '',
    speaker: '',
    date: new Date().toLocaleDateString('ur-PK'),
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await addDoc(collection(db, 'bayans'), {
        ...formData,
        createdAt: new Date(),
      });
      onSuccess();
      alert('Bayan added successfully!');
    } catch (error) {
      console.error('Error adding bayan:', error);
      alert('Failed to add bayan. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, padding: 20 }}>
      <h3 style={{ marginTop: 0, marginBottom: 20 }}>Add New Bayan</h3>
      <form>
        <div style={{ marginBottom: 15 }}>
          <label>Title (Urdu)</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., جمعہ کا بیان"
            style={{ width: '100%', padding: 8, marginBottom: 8, border: '1px solid #ddd', borderRadius: 4 }}
          />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Description</label>
          <textarea
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., موضوع chunks ke baaray main ..."
            style={{ width: '100%', padding: 8, marginBottom: 8, border: '1px solid #ddd', borderRadius: 4 }}
          ></textarea>
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Media URL (YouTube/Vimeo link)</label>
          <input
            type="text"
            name="mediaUrl"
            value={formData.mediaUrl}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
            style={{ width: '100%', padding: 8, marginBottom: 8, border: '1px solid #ddd', borderRadius: 4 }}
          />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Speaker</label>
          <input
            type="text"
            name="speaker"
            value={formData.speaker}
            onChange={handleChange}
            placeholder="e.g., مفتی محمد ذبیح اللہ مہران"
            style={{ width: '100%', padding: 8, marginBottom: 8, border: '1px solid #ddd', borderRadius: 4 }}
          />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{ width: '100%', padding: 8, marginBottom: 8, border: '1px solid #ddd', borderRadius: 4 }}
          />
        </div>
        <button
          type="submit"
          disabled={isSaving}
          style={{
            width: '100%',
            padding: 10,
            backgroundColor: isSaving ? '#aaa' : '#064E3B',
            color: '#FFF',
            border: 'none',
            borderRadius: 5,
            cursor: isSaving ? 'not-allowed' : 'pointer',
            marginTop: 10
          }}
        >
          {isSaving ? 'Saving...' : 'Add Bayan'}
        </button>
      </form>
    </div>
  );
}