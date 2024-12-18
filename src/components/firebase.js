
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; 
import { getFirestore, collection, getDocs   } from "firebase/firestore";
import { getStorage } from 'firebase/storage'; 
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdNHcjNhHD0v6bVs-NfJzT0jkOKLswUNw",
  authDomain: "finalhackathoeofcodenetic.firebaseapp.com",
  projectId: "finalhackathoeofcodenetic",
  storageBucket: "finalhackathoeofcodenetic.firebasestorage.app",
  messagingSenderId: "373473034078",
  appId: "1:373473034078:web:28ad69866ed4f5eee659cf",
  measurementId: "G-JQQCLE9XE7"
};

const provider = new GoogleAuthProvider();
const app=initializeApp(firebaseConfig);

const auth = getAuth(app);  
const db = getFirestore(app);
const storage = getStorage(app);


export {auth ,db,storage,provider};
