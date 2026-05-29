import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, SendHorizonal, User } from "lucide-react";
import { auth, db } from "@/src/firebase/firebaseConfig";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

interface Message {
  id: string;
  senderId: string;
  senderRole: "buyer" | "seller";
  text: string;
}

export default function ChatRoom() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [chatUserName, setChatUserName] = useState("");

  const [currentRole, setCurrentRole] = useState<"buyer" | "seller">("buyer");

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages: Message[] = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          senderId: data.senderId || "",
          senderRole: data.senderRole || "buyer",
          text: data.text || "",
        };
      });

      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      const chatRef = doc(db, "chats", chatId!);

      await addDoc(collection(db, "chats", chatId!, "messages"), {
        text: input,

        senderId: auth.currentUser?.uid,

        senderRole: currentRole,

        createdAt: serverTimestamp(),
      });

      // update parent chat
      await updateDoc(chatRef, {
        lastMessage: input,

        lastSenderId: auth.currentUser?.uid,

        lastSenderRole: currentRole,

        lastUpdated: serverTimestamp(),

        lastSeenByBuyer: currentRole === "buyer",
        lastSeenBySeller: currentRole === "seller",
      });

      setInput("");
    } catch (error) {
      console.error("Failed to send message", error);
      console.log(chatId);
      console.log(auth.currentUser?.uid);
    }
  };

  useEffect(() => {
    const fetchChatInfo = async () => {
      if (!chatId) return;

      try {
        const chatRef = doc(db, "chats", chatId);

        const chatSnap = await getDoc(chatRef);

        if (!chatSnap.exists()) return;

        const chatData = chatSnap.data();

        const currentUserId = auth.currentUser?.uid;

        if (currentUserId === chatData.buyerId) {
          setCurrentRole("buyer");
          setChatUserName(chatData.sellerName);
        } else {
          setCurrentRole("seller");
          setChatUserName(chatData.buyerName);
        }
      } catch (error) {
        console.error("Failed to fetch chat info", error);
      }
    };

    fetchChatInfo();
  }, [chatId]);

  useEffect(() => {
    const markChatAsRead = async () => {
      if (!chatId) return;

      try {
        const chatRef = doc(db, "chats", chatId);

        await updateDoc(chatRef, {
          lastSeenByBuyer: currentRole === "buyer",
          lastSeenBySeller: currentRole === "seller",
        });
      } catch (error) {
        console.error("Failed to mark chat as read", error);
      }
    };

    markChatAsRead();
  }, [chatId, currentRole]);

  return (
    <div className="flex flex-col min-h-screen bg-surface max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-outline-variant/10 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate("/chat")}
          className="size-10 rounded-2xl bg-surface-container-low flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>

        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Seller"
          className="w-12 h-12 rounded-2xl object-cover"
        />

        <div>
          <h2 className="font-black">{chatUserName}</h2>

          <p className="text-xs text-outline">
            {currentRole === "buyer" ? "Seller" : "Buyer"}
          </p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((msg) => {
          const isMine = msg.senderId === auth.currentUser?.uid;

          return (
            <div
              key={msg.id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[78%] px-4 py-3 rounded-3xl shadow-soft ${
                  isMine
                    ? "bg-primary-container text-on-primary-container rounded-br-md"
                    : "bg-white border border-outline-variant/10 rounded-bl-md"
                }`}
              >
                <p className="text-sm leading-6">{msg.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t border-outline-variant/10 p-4">
        <div className="flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type your message..."
            className="flex-1 h-14 px-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
          />

          <button
            onClick={sendMessage}
            className="size-14 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-soft"
          >
            <SendHorizonal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
