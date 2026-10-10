import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAnOAmGW5K5Oma-I6ODV0jzShfVxNiqwU",
  authDomain: "udan-enterprises-zuboo.firebaseapp.com",
  projectId: "udan-enterprises-zuboo",
  storageBucket: "udan-enterprises-zuboo.firebasestorage.app",
  messagingSenderId: "895480239204",
  appId: "1:895480239204:web:853a4895f0b4304c7abb71"
};

// Initialize Firebase safely for SSR/Client
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, firebaseConfig };
