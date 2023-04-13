import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD73enLzPBJE6TbX5Y9XuPfjhpWSiUeyQQ",
  authDomain: "abolina-a5745.firebaseapp.com",
  projectId: "abolina-a5745",
  storageBucket: "abolina-a5745.appspot.com",
  messagingSenderId: "217751325798",
  appId: "1:217751325798:web:698492af1f96a92c1fb1a7",
  measurementId: "G-M0ZT8XSR99",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });

export const FacebookProvider = new firebase.auth.FacebookAuthProvider();
FacebookProvider.setCustomParameters({ prompt: "select_account" });

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
