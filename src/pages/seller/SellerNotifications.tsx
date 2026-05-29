import { ArrowLeft, Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db, auth } from "@/src/firebase/firebaseConfig";

const SellerNotifications: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", auth.currentUser?.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotifications(items.reverse());
    });

    return () => unsubscribe();
  }, []);

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "Unread") {
      return notification.unread;
    }

    if (activeTab === "Orders") {
      return notification.type === "NEW_ORDER";
    }

    return true;
  });

  const markAsRead = async (notificationId: string) => {
    await updateDoc(doc(db, "notifications", notificationId), {
      unread: false,
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 pb-24">
      <header className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="size-10 rounded-2xl bg-white border border-outline-variant/20 flex items-center justify-center shadow-soft"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-xl font-black text-on-surface">
            Seller Notifications
          </h1>

          <p className="text-xs text-outline">
            {notifications.filter((n) => n.unread).length} unread
          </p>
        </div>
      </header>

      <div className="bg-white px-4 border-b border-outline-variant/10">
        <div className="flex gap-8">
          {["All", "Unread", "Orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 transition-all ${
                activeTab === tab
                  ? "border-primary-container text-on-surface"
                  : "border-transparent text-outline"
              }`}
            >
              <p className="text-sm font-bold">{tab}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        {filteredNotifications.length === 0 ? (
          <div className="py-20 text-center text-outline">
            No notifications found
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`flex items-start gap-4 px-4 py-5 border-b border-outline-variant/10 cursor-pointer transition-colors ${
                notification.unread
                  ? "bg-primary/5 border-l-4 border-l-primary"
                  : "bg-white"
              }`}
            >
              <div
                className={`p-3 rounded-2xl shrink-0 ${
                  notification.unread
                    ? "bg-primary/20 text-primary"
                    : "bg-surface-container text-outline"
                }`}
              >
                <Bell size={20} />
              </div>

              <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-baseline">
                  <p
                    className={`text-base leading-tight ${
                      notification.unread
                        ? "font-bold text-on-surface"
                        : "font-semibold text-on-surface"
                    }`}
                  >
                    {notification.title}
                  </p>

                  <p className="text-outline text-xs">
                    {notification.createdAt?.toDate
                      ? notification.createdAt.toDate().toLocaleDateString()
                      : ""}
                  </p>
                </div>

                <p className="text-outline text-sm leading-snug">
                  {notification.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerNotifications;
