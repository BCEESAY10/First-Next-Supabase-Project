// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

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
const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);

// // Log custom events
// function logCustomEvent(eventName, eventParams) {
//     logEvent(analytics, eventName, eventParams);
//   }

// // When a user sends a message in the chatbot
// logEvent(analytics, 'chat_message_sent', {
//     message_length: input.length, 
//     user_id: users.id,       
//   });
  