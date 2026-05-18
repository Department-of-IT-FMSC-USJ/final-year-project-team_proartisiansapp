import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_0zsJ24bDMYqMR7ewBpuJSMzoQ0Dcpbk",
  authDomain: "pro-artisan-marketplace.firebaseapp.com",
  projectId: "pro-artisan-marketplace",
  storageBucket: "pro-artisan-marketplace.firebasestorage.app",
  messagingSenderId: "792059234850",
  appId: "1:792059234850:web:4f529541ef27c0a4c4d87b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);