import { auth } from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Signup functionality
export const signup = async (username, email, password, cb) => {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(credential.user, { displayName: username });
    const user = credential.user;
    cb(user, "সাইন আপ সফল হয়েছে");
  } catch (err) {
    cb(null, err.message);
  }
};

// Signin functionality
export const signin = async (email, password, cb) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const user = credential.user;
    cb(user, "সাইন ইন সফল হয়েছে");
  } catch (err) {
    cb(null, err.message);
  }
};

// Signout functionality
export const signout = async (cb) => {
  try {
    await signOut(auth);
    cb(true, "সাইন আউট সফল হয়েছে");
  } catch (err) {
    cb(null, err.message);
  }
};
