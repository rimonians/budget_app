import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";

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
