import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDElty3xGwJJ_NDa9kUfWKNGy1beyxPSpE",
  authDomain: "netflix-clone-nextjs-3e2cd.firebaseapp.com",
  projectId: "netflix-clone-nextjs-3e2cd",
  storageBucket: "netflix-clone-nextjs-3e2cd.appspot.com",
  messagingSenderId: "454289634102",
  appId: "1:454289634102:web:f9d2b3489d1a0db94d7997",
  measurementId: "G-M6EB0KSDR5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider()


export { auth, provider };
export default db;
