import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyA9QKJvIdbFqSUovlfqKinVSC3OzRWXLnY",
  authDomain: "fitnessappdevmobile.firebaseapp.com",
  projectId: "fitnessappdevmobile",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native Persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (e) {
  // Se o auth já foi inicializado (ex: hot reload), pega a instância existente
  auth = getAuth(app);
}

const db = getFirestore(app);

export { app, auth, db };