import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMDdIEbeNYcOW6elliRROqLD_3o6vz33c",
  authDomain: "typingmaster-360c4.firebaseapp.com",
  projectId: "typingmaster-360c4",
  storageBucket: "typingmaster-360c4.appspot.com",
  messagingSenderId: "530130116422",
  appId: "1:530130116422:web:7496f22425ea75568fcf47",
};

// initialize firebase/firebase app..
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth, db};