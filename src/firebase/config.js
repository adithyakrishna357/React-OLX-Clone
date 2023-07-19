import { initializeApp } from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCAxvwO_P7NLDqNTUXmdP-cPxI0E9LJAYc",
    authDomain: "fir-f0270.firebaseapp.com",
    projectId: "fir-f0270",
    storageBucket: "fir-f0270.appspot.com",
    messagingSenderId: "668429869532",
    appId: "1:668429869532:web:f50471df98fdab77362f19",
    measurementId: "G-46KEBKTCE3"
  };


   export default  initializeApp(firebaseConfig);