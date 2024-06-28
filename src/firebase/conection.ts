import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBX4w8ukJp2yEEr2pcaeb2K0xFPdKZIvd0",
  authDomain: "safety-street-65d5f.firebaseapp.com",
  projectId: "safety-street-65d5f",
  storageBucket: "safety-street-65d5f.appspot.com",
  messagingSenderId: "932660781940",
  appId: "1:932660781940:web:a30a8c98a9b23f07a5c221"
};

const FirebaseConn = initializeApp(firebaseConfig);
const StorageConn = getStorage(FirebaseConn);

export { FirebaseConn, StorageConn };