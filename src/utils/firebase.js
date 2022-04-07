import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


  // Initialize Firebase
  firebase.initializeApp( {
    apiKey: "AIzaSyCvCqjTRnjeeAF20ch8-yfRXdr_VKWZNUE",
    authDomain: "whatsapp-clonw.firebaseapp.com",
    databaseURL: "https://whatsapp-clonw.firebaseio.com",
    projectId: "whatsapp-clonw",
    storageBucket: "whatsapp-clonw.appspot.com",
    messagingSenderId: "333077119463",
    appId: "1:333077119463:web:0531a8c48c358fc75dbd42",
    measurementId: "G-8FKM05WK1B"
  });

  export const db = firebase.firestore()
  export const auth = firebase.auth()
  export default firebase;