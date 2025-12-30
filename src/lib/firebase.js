// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ❌ REMOVE analytics import completely in dev
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDAEt0rUglFKgvd_1MeasDE9Y-x0U_okJs",
  authDomain: "drivehire-fd4a1.firebaseapp.com",
  projectId: "drivehire-fd4a1",
  storageBucket: "drivehire-fd4a1.firebasestorage.app",
  messagingSenderId: "755989669894",
  appId: "1:755989669894:web:66aa1ca251636b6789bb87",
  measurementId: "G-MH6ELSFLJH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth FIRST
export const auth = getAuth(app);

// ✅ Firestore
export const db = getFirestore(app);

// ✅ Google provider
export const googleProvider = new GoogleAuthProvider();

// ❌ DO NOT initialize analytics here
