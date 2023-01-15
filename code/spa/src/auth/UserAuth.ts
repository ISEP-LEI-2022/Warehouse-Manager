// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA1ORwHTbzYb-OUCIZUsV3rkltN74tOtqU",
    authDomain: "warehouse-manager-1cb47.firebaseapp.com",
    projectId: "warehouse-manager-1cb47",
    storageBucket: "warehouse-manager-1cb47.appspot.com",
    messagingSenderId: "637756518421",
    appId: "1:637756518421:web:c5fc2f5cd46c4490521e1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth()
const provider = new GoogleAuthProvider();

export { app, auth, provider }