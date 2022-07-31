import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: `${process.env.FIRSBASE_URL}`,
  authDomain: `${process.env.AUTHDOMAIN}`,
  projectId: `${process.env.PROJECTID}`,
  storageBucket: `${process.env.STORAGEBUCKET}`,
  messagingSenderId: `${process.env.MESSAGINGSENDERID}`,
  appId: `${process.env.APPID}`,
  measurementId: `${process.env.MEASUREMENTID}`,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider()


export { auth, provider };
export default db;
