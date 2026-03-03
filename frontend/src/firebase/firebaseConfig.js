// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlEpYyDe0yZ9hOi8_gy8sPvWNfh2ZhVKU",
    authDomain: "melodicsai.firebaseapp.com",
    projectId: "melodicsai",
    storageBucket: "melodicsai.firebasestorage.app",
    messagingSenderId: "1077676970426",
    appId: "1:1077676970426:web:6abff8cc6a6320b8fa0d83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//I'm gonna export auth
export const auth = getAuth(app);