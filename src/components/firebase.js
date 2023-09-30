// Firebase imports

import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsqcUT5M_VBnaoEOKZ9GpV0WeX6QapiEY",
  authDomain: "tech-trivia-showdown.firebaseapp.com",
  databaseURL:
    "https://tech-trivia-showdown-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tech-trivia-showdown",
  storageBucket: "tech-trivia-showdown.appspot.com",
  messagingSenderId: "10781721370",
  appId: "1:10781721370:web:dbdae5a38f28f2afcda2a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
