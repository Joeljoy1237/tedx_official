// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApqtM077r9VoVwg928slO9LKtLR0Wk_ys",
  authDomain: "tedxccet.firebaseapp.com",
  projectId: "tedxccet",
  storageBucket: "tedxccet.appspot.com",
  messagingSenderId: "653705804844",
  appId: "1:653705804844:web:03fca4a4e302271dd0a589",
  measurementId: "G-6X312LT9J2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
const storage = getStorage(app);

export { storage };