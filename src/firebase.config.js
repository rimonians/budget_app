// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";

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

// Initialize Database
export const db = getFirestore();

// Collection Ref
export const colRef = collection(db, "budget");

// Budget add
export const budgetAdd = async (data, cb) => {
  try {
    await addDoc(colRef, {
      ...data,
      amount: Number(data.amount),
      createAt: serverTimestamp(),
    });
    cb(200, "সফলভাবে নতুন বাজেট যোগ করা হয়েছে");
  } catch (err) {
    cb(500, "নতুন বাজেট যোগ করতে সমস্যা হয়েছে");
  }
};

// Budget delete
export const budgetDelete = async (id, cb) => {
  try {
    const docRef = doc(db, "budget", id);
    await deleteDoc(docRef);
    cb(200, "সফলভাবে বাজেট মুছে ফেলা হয়েছে");
  } catch (err) {
    cb(500, "বাজেট মুছে ফেলতে সমস্যা হয়েছে");
  }
};
