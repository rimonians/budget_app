// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABDJ7DO723DaWZzsL3X-o3yDMLCI0yqLk",
  authDomain: "budget-app-71e46.firebaseapp.com",
  projectId: "budget-app-71e46",
  storageBucket: "budget-app-71e46.appspot.com",
  messagingSenderId: "200700116244",
  appId: "1:200700116244:web:a2bfd066b33b7bd5775601",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
