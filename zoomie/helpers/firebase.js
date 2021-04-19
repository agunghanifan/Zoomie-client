import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK0iEoZv6YCAeEe1U_CGS6cQioGI1tHCQ",
  authDomain: "chat-32cb0.firebaseapp.com",
  projectId: "chat-32cb0",
  storageBucket: "chat-32cb0.appspot.com",
  messagingSenderId: "613319640010",
  appId: "1:613319640010:web:7e44bc6e42064cac158533"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase