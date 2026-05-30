import { auth, db } from "../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";


// REGISTER USER
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: "buyer" | "seller",
  phone: string = ""
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name,
    email,
    phone,
    role,
    provider: "email",
    createdAt: serverTimestamp(),
  });

  return user;
};


// LOGIN USER
export const loginUser = async (
  email: string,
  password: string
) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};


// GOOGLE SIGN IN
export const signInWithGoogle = async (
  role: "buyer" | "seller"
) => {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const existingUser = await getDoc(userRef);

  // Save only if first time
  if (!existingUser.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      phone: user.phoneNumber || "",
      role,
      provider: "google",
      createdAt: serverTimestamp(),
    });
  }

  return user;
};
