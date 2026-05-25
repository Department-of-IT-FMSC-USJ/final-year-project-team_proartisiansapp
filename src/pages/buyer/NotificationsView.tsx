import React from "react";

interface Notification {
  id: string;
  type:
    | "ORDER_ACCEPTED"
    | "SELLER_RESPONDED"
    | "NEW_PRODUCTS"
    | "SHIPPED"
    | "REVIEW";
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

interface NotificationsViewProps {}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "ORDER_ACCEPTED",
    title: "Order accepted",
    message:
      "Artisan 'John Doe' has accepted your custom furniture order. Production starts soon!",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    type: "SELLER_RESPONDED",
    title: "Seller responded",
    message:
      "You have a new message regarding your pottery inquiry from Elena Designs.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "3",
    type: "NEW_PRODUCTS",
    title: "New products added",
    message:
      "Handcrafted Ceramics has updated their catalog with 5 new summer items.",
    time: "3h ago",
    unread: false,
  },
  {
    id: "4",
    type: "SHIPPED",
    title: "Package Shipped",
    message:
      "Your custom leather wallet order has been shipped. Track your delivery now.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "5",
    type: "REVIEW",
    title: "Review your purchase",
    message:
      "Help the community! Rate your recent experience with WoodWorks Studio.",
    time: "2 days ago",
    unread: false,
  },
];

const NotificationsView: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Tabs */}
      <div className="bg-white px-4 border-b border-slate-50">
        <div className="flex gap-8">
          {["All", "Unread", "Orders"].map((tab) => (
            <button
              key={tab}
              className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-4 transition-all ${
                tab === "All"
                  ? "border-primary text-slate-900"
                  : "border-transparent text-slate-400"
              }`}
            >
              <p className="text-sm font-bold">{tab}</p>
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-4 px-4 py-5 border-b border-slate-50 transition-colors ${
              notification.unread
                ? "bg-primary/5 border-l-4 border-l-primary"
                : "bg-white"
            }`}
          >
            <div
              className={`p-3 rounded-2xl shrink-0 ${
                notification.unread
                  ? "bg-primary/20 text-primary"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined block">
                {getIconForType(notification.type)}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex justify-between items-baseline">
                <p
                  className={`text-base leading-tight ${notification.unread ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}
                >
                  {notification.title}
                </p>
                <p className="text-slate-400 text-xs">{notification.time}</p>
              </div>
              <p className="text-slate-500 text-sm leading-snug">
                {notification.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getIconForType(type: Notification["type"]): string {
  switch (type) {
    case "ORDER_ACCEPTED":
      return "check_circle";
    case "SELLER_RESPONDED":
      return "chat_bubble";
    case "NEW_PRODUCTS":
      return "new_releases";
    case "SHIPPED":
      return "local_shipping";
    case "REVIEW":
      return "star";
    default:
      return "notifications";
  }
}
export default NotificationsView;
