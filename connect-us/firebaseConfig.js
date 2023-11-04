// Import the functions you need from the SDKs you need
// import * as firebase from firebase;
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase} from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCi_UNRgiSftmWPxpnpg9LDf7JOlP8Sey8",
    authDomain: "connectus-fb453.firebaseapp.com",
    projectId: "connectus-fb453",
    storageBucket: "connectus-fb453.appspot.com",
    messagingSenderId: "655435582591",
    appId: "1:655435582591:web:d6b5ce5b09e8ac5151434a",
    measurementId: "G-MFS2VG6NXB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db};
