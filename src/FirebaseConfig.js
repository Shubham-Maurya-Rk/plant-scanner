// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmIVKJs1GFcj7PvjVRWC7_2qK_Q6pitDM",
  authDomain: "my-plant-scanner.firebaseapp.com",
  projectId: "my-plant-scanner",
  storageBucket: "my-plant-scanner.appspot.com",
  messagingSenderId: "495390052006",
  appId: "1:495390052006:web:aa61c44a30efd599e5ee67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const imageDB=getStorage(app)
export const auth=getAuth(app)


