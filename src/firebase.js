// yarn add firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD_Epmq4SFlGO_BjO1hBzWBkwwaomw4si8",
    authDomain: "snapchat-clone-e96bf.firebaseapp.com",
    projectId: "snapchat-clone-e96bf",
    storageBucket: "snapchat-clone-e96bf.appspot.com",
    messagingSenderId: "935959024086",
    appId: "1:935959024086:web:b6f854540725ccc0119477"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();




export {db, auth, provider, storage};