import firebase from 'firebase';

  var firebaseConfig = {
    apiKey: "AIzaSyCijTkR2x3dbOkdGC7mJIPC0z5OWHEr_JI",
  authDomain: "appfirebase1-c2199.firebaseapp.com",
  projectId: "appfirebase1-c2199",
  storageBucket: "appfirebase1-c2199.appspot.com",
  messagingSenderId: "603974398777",
  appId: "1:603974398777:web:599af9a44e33373aa22ee8",
  measurementId: "G-SY7XCP4KP7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  firebase.db = firebase.firestore() 
  firebase.autenticacion = firebase.auth()
  

  export default firebase;
