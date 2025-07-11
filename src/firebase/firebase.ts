import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvMOB7Sj537752wGyApFh2865YnTt9qHY",
  authDomain: "pustaklink-ab06d.firebaseapp.com",
  projectId: "pustaklink-ab06d",
  storageBucket: "pustaklink-ab06d.firebasestorage.app",
  messagingSenderId: "435791021437",
  appId: "1:435791021437:web:eb6d432b04c24fbb743814",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
