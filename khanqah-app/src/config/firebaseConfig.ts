import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCOHkr-MGjtZJ8Z6iXB1mo-T-5VICdbiaw",
  authDomain: "reactnativeapp-9d297.firebaseapp.com",
  projectId: "reactnativeapp-9d297",
  storageBucket: "reactnativeapp-9d297.firebasestorage.app",
  messagingSenderId: "499594432497",
  appId: "1:499594432497:web:fd4bdcacbe722e56a93e50"
};

// Initialize Firebase (prevent duplicate initialization on fast reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
