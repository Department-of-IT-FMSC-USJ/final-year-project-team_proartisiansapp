import { useNavigate } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db, auth } from "@/src/firebase/firebaseConfig";

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  accepted: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-rose-100 text-rose-700",
};

const statusLabels: Record<string, string> = {
  pending: "Processing",
  accepted: "Accepted",
  completed: "Delivered",
  cancelled: "Cancelled",
};

export default function BuyerOrders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Pending", "Accepted", "Completed", "Cancelled"];
  const [orders, setOrders] = useState<any[]>([]);

  const filtered =
    activeTab === "All"
      ? orders
      : orders.filter(
          (o) => o.status?.toLowerCase() === activeTab.toLowerCase(),
        );

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("buyerId", "==", auth.currentUser?.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 pb-24">
      <header>
        <button
          onClick={() => navigate(-1)}
          className="text-on-surface flex size-12 shrink-0 items-center justify-start cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </header>
      <div className="sticky top-0 bg-white z-50 border-b border-outline-variant/10">
        {" "}
        <div className="flex px-4 gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex flex-col items-center justify-center pb-3 pt-4 whitespace-nowrap transition-all border-b-[3px]",
                activeTab === tab
                  ? "border-primary-container text-on-surface"
                  : "border-transparent text-outline",
              )}
            >
              <p className="text-sm font-bold">{tab}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {filtered.map((order) => (
          <div
            key={order.id}
            className="flex flex-col overflow-hidden rounded-3xl border border-outline-variant/10 bg-white shadow-soft"
          >
            <div className="h-40 w-full relative">
              <img
                src={order.productImage}
                alt={order.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span
                  className={`${statusStyles[order.status]} px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight`}
                >
                  {statusLabels[order.status]}
                </span>
              </div>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <div>
                <p className="text-[10px] font-black text-primary-container uppercase tracking-wider">
                  {order.status} • {order.date}
                </p>
                <h3 className="text-on-surface text-lg font-black mt-0.5">
                  {order.productName}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full overflow-hidden bg-primary-container flex items-center justify-center">
                    <span className="text-on-primary-container text-xs font-bold">
                      {order.sellerName?.charAt(0)}
                    </span>
                  </div>
                  <p className="text-outline text-sm">{order.sellerName}</p>
                </div>
                <p className="font-black text-on-surface">
                  {order.quantity} item(s)
                </p>
              </div>
              <button
                onClick={() => navigate(`/chat/${order.id}`)}
                className={cn(
                  "w-full h-11 rounded-xl text-sm font-black transition-all active:scale-[0.98]",
                  order.status === "cancelled"
                    ? "bg-surface-container text-outline"
                    : "bg-primary-container text-on-primary-container",
                )}
              >
                {order.status === "cancelled"
                  ? "Refund Details"
                  : "View Details"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
