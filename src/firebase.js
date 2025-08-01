 // src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import auth for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAufRi3jPVbIExv5cDkMltUR6O6_EnO_ao",
  authDomain: "college-attendence-app-aa83b.firebaseapp.com",
  projectId: "college-attendence-app-aa83b",
  storageBucket: "college-attendence-app-aa83b.firebasestorage.app",
  messagingSenderId: "745246093384",
  appId: "1:745246093384:web:0fa9e07f92b43422bba87d",
  measurementId: "G-B8RFLKJMDD"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
