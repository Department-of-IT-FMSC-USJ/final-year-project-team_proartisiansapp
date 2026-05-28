import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

export const createOrGetChat = async (
  orderId: string,
  buyerId: string,
  sellerId: string
) => {
  try {
    const chatsRef = collection(db, "chats");

    // check existing chat
    const q = query(
      chatsRef,
      where("orderId", "==", orderId)
    );

    const querySnapshot = await getDocs(q);

    // existing chat found
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].id;
    }

    // create new chat
    const newChatRef = doc(chatsRef);

    await setDoc(newChatRef, {
      orderId,
      buyerId,
      sellerId,
      participants: [buyerId, sellerId],
      lastMessage: "",
      lastUpdated: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    return newChatRef.id;

  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};