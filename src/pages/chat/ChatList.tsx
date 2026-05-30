import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";

import { ArrowLeft } from "lucide-react";

const ChatList = () => {
  const user = auth.currentUser;
  console.log("ChatList User:", user);
  const navigate = useNavigate();

  const [chats, setChats] = useState<any[]>([]);

  const handleBack = () => {
    const role = localStorage.getItem("role");

    if (role === "seller") {
      navigate("/seller/dashboard");
    } else {
      navigate("/buyer/dashboard");
    }
  };

  useEffect(() => {
    if (!user) {
      console.log("No user found");
      return;
    }

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", user.uid),
      orderBy("lastUpdated", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setChats(chatData);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) {
      console.log("No user found");
      return;
    }

    console.log("User UID:", user.uid);

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", user.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("Chats found:", snapshot.docs.length);

      const chatData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(chatData);

      setChats(chatData);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="min-h-screen bg-surface max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-outline-variant/10 px-4 py-4">
        <button
          onClick={handleBack}
          className="size-10 rounded-2xl bg-white border border-outline-variant/20 flex items-center justify-center shadow-soft"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-black">Messages</h1>
      </header>

      {/* Chat List */}
      <div className="p-4 space-y-3">
        {chats.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>No conversations yet</p>
          </div>
        ) : (
          chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="w-full bg-white border rounded-2xl p-4 flex items-center gap-4 shadow-sm text-left hover:bg-gray-50 transition"
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                {(user?.uid === chat.buyerId
                  ? chat.sellerName
                  : chat.buyerName
                )?.charAt(0)}{" "}
              </div>

              {/* Chat Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold truncate">
                    {user?.uid === chat.buyerId
                      ? chat.sellerName
                      : chat.buyerName}
                  </h2>

                  {((user?.uid === chat.buyerId && !chat.lastSeenByBuyer) ||
                    (user?.uid === chat.sellerId &&
                      !chat.lastSeenBySeller)) && (
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </div>

                <p className="text-sm text-gray-500 truncate">
                  {chat.lastSenderId === user?.uid ? "You: " : ""}
                  {chat.lastMessage || "No messages yet"}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
