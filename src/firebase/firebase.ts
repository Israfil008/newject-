// src/firebase/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDvMOB7Sj537752wGyApFh2865YnTt9qHY",
  authDomain: "pustaklink-ab06d.firebaseapp.com",
  projectId: "pustaklink-ab06d",
  storageBucket: "pustaklink-ab06d.appspot.com", // fixed this typo from `.app` to `.app**spot.com**`
  messagingSenderId: "435791021437",
  appId: "1:435791021437:web:eb6d432b04c24fbb743814",
};

// Initialize app safely (to prevent duplicate initialization)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
