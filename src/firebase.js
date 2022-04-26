// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdVS2ebyGluc4DCyEtzFo5So695PHxJZ4",
  authDomain: "react-eval-form.firebaseapp.com",
  projectId: "react-eval-form",
  storageBucket: "react-eval-form.appspot.com",
  messagingSenderId: "582463786290",
  appId: "1:582463786290:web:05a7fca937dd2eba7c5b2b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
