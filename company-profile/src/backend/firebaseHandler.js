import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzLEc-tMFbHCeYKxveMcTSb8qz30Cb1w0",
  authDomain: "job-project-f03c5.firebaseapp.com",
  databaseURL:
    "https://job-project-f03c5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "job-project-f03c5",
  storageBucket: "job-project-f03c5.appspot.com",
  messagingSenderId: "561269267101",
  appId: "1:561269267101:web:382b0fc2072441a1105274",
};

const app = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(app);
export const firebaseAuth = getAuth(app);
