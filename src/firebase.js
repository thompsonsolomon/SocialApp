import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()


// REACT_APP_FIREBASE_API_KEY=AIzaSyAcyYu0Py4CtB_OGgy0LetKEPOU5sAGsZQ
// REACT_APP_FIREBASE_AUTH_DOMAIN=my-social-media-app-def7d.firebaseapp.com
// REACT_APP_FIREBASE_PROJECT_ID=my-social-media-app-def7d
// REACT_APP_FIREBASE_STORAGE_BUCKET=my-social-media-app-def7d.appspot.com
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID=782628232715
// REACT_APP_FIREBASE_APP_ID=1:782628232715:web:c4f9d8fdd4756ed3b0b10e
// REACT_APP_FIREBASE_MEASUREMENT_ID=G-F06ZZJPPG9 
