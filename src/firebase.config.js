// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDuG7_1HeLr4nCPpxCge6nf2Yzredrt8ng",
  authDomain: "testapp-6d321.firebaseapp.com",
  projectId: "testapp-6d321",
  storageBucket: "testapp-6d321.appspot.com",
  messagingSenderId: "758258425742",
  appId: "1:758258425742:web:d3651bb71357f84a0e0edf"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });