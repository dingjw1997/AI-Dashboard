import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCd2ZLbbdfThNBNO4WyhrjJaFIq30TS3-0",
  authDomain: "capstonecomputingproject.firebaseapp.com",
  databaseURL: "https://capstonecomputingproject-default-rtdb.firebaseio.com",
  projectId: "capstonecomputingproject",
  storageBucket: "capstonecomputingproject.appspot.com",
  messagingSenderId: "159811684889",
  appId: "1:159811684889:web:110441b6234389d1f6f888"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export { app, storage, database, dbRef, push, ref, uploadBytes, getDownloadURL };
