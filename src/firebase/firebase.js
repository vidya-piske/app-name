import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCP_2zzkXLuNIN0rYtaLEzLi0NZHOlgeR4",
  authDomain: "login-authentication-eb731.firebaseapp.com",
  projectId: "login-authentication-eb731",
  storageBucket: "login-authentication-eb731.appspot.com",
  messagingSenderId: "492595708127",
  appId: "1:492595708127:web:b61909185bd97441a2e96a",
  measurementId: "G-104P9GHFCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
