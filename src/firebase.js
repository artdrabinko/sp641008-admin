import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBEOaAWaKFWYngqV6wZmefMWBIIDw-rA5Q",
  authDomain: "sp641008.firebaseapp.com",
  databaseURL: "https://sp641008.firebaseio.com",
  projectId: "sp641008",
  storageBucket: "sp641008.appspot.com",
  messagingSenderId: "809810109834"
};

firebase.initializeApp(config);

export const firebaseDB = firebase.database();
export const storageRef = firebase.storage().ref();
export const firebaseStorage = firebase.storage;
export const firebaseAuth = firebase.auth();
