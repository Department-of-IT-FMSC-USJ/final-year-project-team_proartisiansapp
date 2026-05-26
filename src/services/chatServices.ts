import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

export const sendMessage = async (
  chatId: string,
  senderId: string,
  senderRole: "buyer" | "seller",
  text: string
) => {
  if (!text.trim()) return;

  await addDoc(collection(db, "chats", chatId, "messages"), {
    senderId,
    senderRole,
    text,
    createdAt: serverTimestamp(),
  });
};

export const subscribeToMessages = (
  chatId: string,
  callback: (messages: any[]) => void
) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(messages);
  });
};
