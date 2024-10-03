// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics} from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXuVXb-T5N3tGfUhdZJEHnDwT5VtBNbqI",
  authDomain: "test-chatbot-44053.firebaseapp.com",
  projectId: "test-chatbot-44053",
  storageBucket: "test-chatbot-44053.appspot.com",
  messagingSenderId: "699277538079",
  appId: "1:699277538079:web:d88ee0b87b5b376ffcb62a",
  measurementId: "G-KY0MPHX1QR"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
export const analytics = getAnalytics(firebaseApp);
