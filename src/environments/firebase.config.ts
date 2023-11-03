// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB26Kib5f2QnkcmxHwEKu3TfsiFWz3wbm8",
    authDomain: "crowdagent-d7002.firebaseapp.com",
    projectId: "crowdagent-d7002",
    storageBucket: "crowdagent-d7002.appspot.com",
    messagingSenderId: "982516348530",
    appId: "1:982516348530:web:e538fa905b685664a5f4eb",
    measurementId: "G-Y0M7ECJGVG",
    databaseURL: "https://crowdagent-d7002-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app)
const storage = getFirestore(app)

export default firebaseConfig;