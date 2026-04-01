import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB04h5CvIpnEGr7E3LS9rLK74vEbuozG8w",
  authDomain: "ngo-aa5d9.firebaseapp.com",
  projectId: "ngo-aa5d9",
  storageBucket: "ngo-aa5d9.firebasestorage.app",
  messagingSenderId: "537588121538",
  appId: "1:537588121538:web:c3e3126ad4aa51902c205b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;