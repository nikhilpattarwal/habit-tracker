// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqrSPpIrxPjXGXlC5l-oOWf40aqrQXHYA",
  authDomain: "habit-tracker-1a71d.firebaseapp.com",
  projectId: "habit-tracker-1a71d",
  storageBucket: "habit-tracker-1a71d.appspot.com",
  messagingSenderId: "693664863741",
  appId: "1:693664863741:web:419dc98689940b6024f594",
  measurementId: "G-L0FZGCWH4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};