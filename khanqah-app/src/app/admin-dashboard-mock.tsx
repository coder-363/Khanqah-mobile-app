import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

export default function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Please fill in the title and description.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'bayans'), {
        title,
        description,
        mediaUrl,
        speaker: 'مفتی محمد ذبیح اللہ مہران',
        date: new Date().toLocaleDateString('ur-PK'),
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', 'Bayan uploaded successfully!');
      setTitle('');
      setDescription('');
      setMediaUrl('');
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert('Error', 'Failed to upload content.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Content Manager</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Upload New Bayan</Text>

          <TextInput
            style={styles.input}
            placeholder="Title (e.g., Importance of Prayer)"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Description"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <TextInput
            style={styles.input}
            placeholder="Media URL (Audio/Video Link)"
            value={mediaUrl}
            onChangeText={setMediaUrl}
          />

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleUpload}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Upload to Khanqah App</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Instructions</Text>
          <Text style={styles.instructionText}>
            1. Fill in the Urdu title and description.{"\n"}
            2. Add the URL for the audio or video file.{"\n"}
            3. Tap upload to sync with the mobile app instantly.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f5' },
  header: { padding: 20, backgroundColor: '#064E3B' },
  title: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  section: { marginBottom: 20, backgroundColor: '#FFF', padding: 15, borderRadius: 10, elevation: 2 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#064E3B' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 15, backgroundColor: '#fdfdfd' },
  button: { backgroundColor: '#064E3B', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  instructionText: { fontSize: 14, color: '#666', lineHeight: 20 }
});
