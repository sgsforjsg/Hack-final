import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// firebase project on nestadmission@gmail,sgsbackup1
var config = {
  apiKey: "AIzaSyAXp8mtOLFy6HaADmRTD8-Gx-K-z7h8-Dw",
  authDomain: "finalcompetition108-9ae86.firebaseapp.com",
  projectId: "finalcompetition108-9ae86",
  storageBucket: "finalcompetition108-9ae86.appspot.com",
  messagingSenderId: "720291407812",
  appId: "1:720291407812:web:20efddc29a0b4e2a47e691",
  measurementId: "G-897CJE4WRC"

};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 