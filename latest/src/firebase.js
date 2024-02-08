// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-estate-b82ab.firebaseapp.com",
  projectId: "mern-estate-b82ab",
  storageBucket: "mern-estate-b82ab.appspot.com",
  messagingSenderId: "740941002133",
  appId: "1:740941002133:web:91b5707df343137f91f29c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);