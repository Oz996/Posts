import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCJtIzKXBasQrT_-tWytUJXCMncmkh_liA",
  authDomain: "posts-d3151.firebaseapp.com",
  projectId: "posts-d3151",
  storageBucket: "posts-d3151.appspot.com",
  messagingSenderId: "272959835114",
  appId: "1:272959835114:web:53ed99ffb08cc498b3c093",
  measurementId: "G-P0YRTW703Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);