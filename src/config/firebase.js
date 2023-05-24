// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKMMgfBjpdqfCqMj9i6z9QKoPiIRa0R9I",
  authDomain: "projeto-fausto.firebaseapp.com",
  projectId: "projeto-fausto",
  storageBucket: "projeto-fausto.appspot.com",
  messagingSenderId: "29280474183",
  appId: "1:29280474183:web:aee1500986973e3bb14d62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };