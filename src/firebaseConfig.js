import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/storage";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

//import dataConfig from './dataConfig'

const app = firebase.initializeApp(
    {
    apiKey: "AIzaSyBY0qG7OPtnqDyNVUpIM0qKiDfuJbOuJPU",
    authDomain: "storage-test-2ed37.firebaseapp.com",
    projectId: "storage-test-2ed37",
    storageBucket: "storage-test-2ed37.appspot.com",
    messagingSenderId: "66537280828",
    appId: "1:66537280828:web:b823f4ee10435dc3707a39"
  }
);

/*const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();*/
const storage = app.storage();
const firestore = app.firestore().collection("Videos");
export {firestore, storage, app as default}
