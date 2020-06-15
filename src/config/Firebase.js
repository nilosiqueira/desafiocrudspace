import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyD1epNYlbFD_pRZVxAZoVtmHf6t1vdBCVk",
  authDomain: "react-auth-firebase-deb0b.firebaseapp.com",
  databaseURL: "https://react-auth-firebase-deb0b.firebaseio.com",
  projectId: "react-auth-firebase-deb0b",
  storageBucket: "react-auth-firebase-deb0b.appspot.com",
  messagingSenderId: "228947580497",
  appId: "1:228947580497:web:50a76a764cb15497b6ca70",
  measurementId: "G-Q4DFWD0BM2"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;