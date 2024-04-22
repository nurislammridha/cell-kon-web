import firebase from "firebase/app"
import "firebase/auth"

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAkFUyyI_YvP9AxLgZ8yQlxEoW4iBxoqDM",
//     authDomain: "portfolio-ecommerce-bebff.firebaseapp.com",
//     projectId: "portfolio-ecommerce-bebff",
//     storageBucket: "portfolio-ecommerce-bebff.appspot.com",
//     messagingSenderId: "753311787348",
//     appId: "1:753311787348:web:086a56ca3cf635b19600c1",
//     measurementId: "G-65DDLBRBD8"
// };
const firebaseConfig = {
    apiKey: "AIzaSyCZGZzackK40jsOIds-3hI-UotagD6nSxk",
    authDomain: "sellkon.firebaseapp.com",
    projectId: "sellkon",
    storageBucket: "sellkon.appspot.com",
    messagingSenderId: "644355177912",
    appId: "1:644355177912:web:bbf388bcc8a0901e2f634d",
    measurementId: "G-599M9R2RD9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

