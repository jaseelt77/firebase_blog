import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from   "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBoHbeGdf4mdqF6njdtM78XdStHrrxE2gI",
    authDomain: "react-blogs-app-7cf6e.firebaseapp.com",
    projectId: "react-blogs-app-7cf6e",
    storageBucket: "react-blogs-app-7cf6e.appspot.com",
    messagingSenderId: "95190387342",
    appId: "1:95190387342:web:4b5e64812f280ac75d17df",
    measurementId: "G-BG0EY5WR0Z"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export {auth, db, storage};