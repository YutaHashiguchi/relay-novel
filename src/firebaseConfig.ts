// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyBwgY2gDcX238_4VHc3Y8Rci33Q86EJ24w",
  authDomain: "relay-project-f7fa0.firebaseapp.com",
  projectId: "relay-project-f7fa0",
  storageBucket: "relay-project-f7fa0.firebasestorage.app",
  messagingSenderId: "1004072220268",
  appId: "1:1004072220268:web:00e2684512030c5ee38a49",
  measurementId: "G-BC04HQMX5D"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 🔥 Firestoreのインスタンスを取得してexport（←これが必要！）
export const db = getFirestore(app);
