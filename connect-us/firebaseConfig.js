// Import the functions you need from the SDKs you need
// import * as firebase from firebase;
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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
  measurementId: "G-MFS2VG6NXB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

const storage = getStorage(app);

export { auth, db, storage };
