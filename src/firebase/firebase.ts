import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATAU7wf6YSIXZH7nwrtUtE1wuG6I8JIFo",
  authDomain: "social-app-6a90f.firebaseapp.com",
  projectId: "social-app-6a90f",
  storageBucket: "social-app-6a90f.firebasestorage.app",
  messagingSenderId: "333273719570",
  appId: "1:333273719570:web:8abcec271fa7cad21989cb",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
