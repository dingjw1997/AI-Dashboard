import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyCAsD-i96MvX_5hYspEVP4j3TczFdCHMYE",
  authDomain: "interactive-dashboard-66abf.firebaseapp.com",
  databaseURL: "https://interactive-dashboard-66abf-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "interactive-dashboard-66abf",
  storageBucket: "interactive-dashboard-66abf.appspot.com",
  messagingSenderId: "540835068994",
  appId: "1:540835068994:web:bf6848691b4c238c48c1db"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export default database;
