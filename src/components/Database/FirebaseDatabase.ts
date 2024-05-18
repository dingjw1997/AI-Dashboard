import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


const firebaseConfig = {
    apiKey: "AIzaSyCd2ZLbbdfThNBNO4WyhrjJaFIq30TS3-0",
    authDomain: "capstonecomputingproject.firebaseapp.com",
    projectId: "capstonecomputingproject",
    storageBucket: "capstonecomputingproject.appspot.com",
    messagingSenderId: "159811684889",
    appId: "1:159811684889:web:110441b6234389d1f6f888"
  };
  
  
firebase.initializeApp(firebaseConfig);

export default firebase;