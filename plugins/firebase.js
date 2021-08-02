import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCv6f1VvzrJ5K3i9ZGjRd4iKehtgy6LrcY",
  authDomain: "race-days.firebaseapp.com",
  projectId: "race-days",
  storageBucket: "race-days.appspot.com",
  messagingSenderId: "858492122979",
  appId: "1:858492122979:web:b8ec04f5e07ee68788c556",
  measurementId: "G-TLQMSEWM89"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const projectFirestore = firebase.firestore();
export const projectAuth = firebase.auth();
export default firebase;
