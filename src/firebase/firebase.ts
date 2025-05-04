import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKVpiHIxPC2p_CjLvlz1WSgkuN4FBDEFU",
  authDomain: "hiveapp-6ab9d.firebaseapp.com",
  projectId: "hiveapp-6ab9d",
  storageBucket: "hiveapp-6ab9d.firebasestorage.app",
  messagingSenderId: "317176331046",
  appId: "1:317176331046:web:ef574af3eb2715324edfe7",
  measurementId: "G-6PCSYS7RCL",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
