// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration (Credentials)
const firebaseConfig = {
    apiKey: "AIzaSyCLy0frnvZSUWhqYdfmsv20dtMh9AYqfwI",
    authDomain: "video-library-74bef.firebaseapp.com",
    projectId: "video-library-74bef",
    storageBucket: "video-library-74bef.appspot.com",
    messagingSenderId: "104807927194",
    appId: "1:104807927194:web:0266ef41fe586a1eea3e23"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;

