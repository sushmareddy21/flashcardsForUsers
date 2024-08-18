import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCOLFPrFKzyPwg6u8IgFIxSjymkXZEj8YU",
  authDomain: "flashcard-bd45b.firebaseapp.com",
  projectId: "flashcard-bd45b",
  storageBucket: "flashcard-bd45b.appspot.com",
  messagingSenderId: "581193542121",
  appId: "1:581193542121:web:af7044ff6b8de41b3f4378",
  measurementId: "G-4CMF32G4HJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
