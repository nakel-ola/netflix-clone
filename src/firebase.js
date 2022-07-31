import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAD4d3OrSTWJ2yNsrDrtnys-AZA7NCsWi8",
  authDomain: "netflix-clone-nextjs-2022.firebaseapp.com",
  projectId: "netflix-clone-nextjs-2022",
  storageBucket: "netflix-clone-nextjs-2022.appspot.com",
  messagingSenderId: "202528381698",
  appId: "1:202528381698:web:b7812f319e82efc2cbc01b",
  measurementId: "G-YWBVK4VF6Y",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider()


export { auth, provider };
export default db;
