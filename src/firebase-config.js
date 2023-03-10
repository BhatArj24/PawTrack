import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTgtAFuq8sGgRRQzdPKH4TRtdWvb97T-g",
  authDomain: "pawtracker-cc7c3.firebaseapp.com",
  projectId: "pawtracker-cc7c3",
  storageBucket: "pawtracker-cc7c3.appspot.com",
  messagingSenderId: "39020160759",
  appId: "1:39020160759:web:7df67e79dbe1802e3555f2",
  measurementId: "G-S7CQRK22FN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);