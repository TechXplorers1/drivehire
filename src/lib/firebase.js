// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAEt0rUglFKgvd_1MeasDE9Y-x0U_okJs",
    authDomain: "drivehire-fd4a1.firebaseapp.com",
    projectId: "drivehire-fd4a1",
    storageBucket: "drivehire-fd4a1.firebasestorage.app",
    messagingSenderId: "755989669894",
    appId: "1:755989669894:web:66aa1ca251636b6789bb87",
    measurementId: "G-MH6ELSFLJH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();