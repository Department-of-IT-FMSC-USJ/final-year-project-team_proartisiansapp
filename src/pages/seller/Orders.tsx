import { Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";

import { db, auth } from "@/src/firebase/firebaseConfig";

import { Check, X } from "lucide-react";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("Active");
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("sellerId", "==", auth.currentUser?.uid),
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

  const acceptOrder = async (order: any) => {
    try {
      console.log("Accept clicked");
      console.log(order);

      const productRef = doc(db, "products", order.productId);

      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) return;

      const productData = productSnap.data();

      const currentStock = productData.stock || 0;

      if (currentStock < order.quantity) {
        alert("Not enough stock available");
        return;
      }

      const newStock = currentStock - order.quantity;

      await updateDoc(productRef, {
        stock: newStock,
      });

      await addDoc(collection(db, "soldProducts"), {
        sellerId: auth.currentUser?.uid,
        productId: order.productId,
        productName: order.productName,
        category: productData.category,
        price: productData.price,
        quantity: order.quantity,
        imageUrl: productData.imageUrl,
        soldAt: new Date(),
      });

      await updateDoc(doc(db, "orders", order.id), {
        status: "accepted",
      });
      await addDoc(collection(db, "notifications"), {
        userId: order.buyerId,
        title: "Order Accepted",
        message: `${order.productName} has been accepted by the seller.`,
        type: "ORDER_ACCEPTED",
        unread: true,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Failed to accept order", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Active") {
      return order.status === "pending";
    }

    if (activeTab === "Accepted") {
      return order.status === "accepted";
    }

    if (activeTab === "Completed") {
      return order.status === "completed";
    }

    if (activeTab === "Cancelled") {
      return order.status === "cancelled";
    }

    return true;
  });

  return (
    <div className="p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-black text-on-surface">Manage Orders</h1>
        <p className="text-outline text-sm">Keep track of your artisan sales</p>
      </header>

      <div className="flex bg-surface-container-low p-1 rounded-2xl">
        {["Active", "Accepted", "Completed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
              activeTab === tab
                ? "bg-white shadow-soft text-primary-container"
                : "text-outline",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl p-5 border border-outline-variant/10 shadow-soft space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-2xl bg-surface-container relative overflow-hidden">
                  <img
                    src={order.productImage}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div>
                  <p className="text-sm font-black">
                    #ORD-{order.id.slice(0, 5)}
                  </p>

                  <p className="text-[10px] text-outline font-bold">
                    {order.quantity} item(s)
                  </p>
                </div>
              </div>

              <span
                className={cn(
                  "text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg flex items-center gap-1",

                  order.status === "pending"
                    ? "bg-blue-50 text-blue-600"
                    : order.status === "accepted"
                      ? "bg-yellow-50 text-yellow-600"
                      : order.status === "completed"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600",
                )}
              >
                <Clock size={10} />

                {order.status}
              </span>
            </div>

            <div className="flex gap-2">
              {order.status === "pending" && (
                <>
                  <button
                    onClick={() => acceptOrder(order)}
                    className="flex-1 bg-primary-container text-[#0f172a] h-11 rounded-xl text-[10px] font-black uppercase tracking-widest"
                  >
                    Accept Order
                  </button>

                  <button
                    onClick={async () => {
                      await updateDoc(doc(db, "orders", order.id), {
                        status: "cancelled",
                      });

                      await addDoc(collection(db, "notifications"), {
                        userId: order.buyerId,
                        title: "Order Cancelled",
                        message: `${order.productName} has been cancelled.`,
                        type: "CANCELLED",
                        unread: true,
                        createdAt: new Date(),
                      });
                    }}
                    className="flex-1 bg-red-500 text-white h-11 rounded-xl text-[10px] font-black uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button onClick={() => navigate(`/chat/${order.id}`)}>
                    Chat
                  </button>
                </>
              )}

              {order.status === "accepted" && (
                <>
                  <button
                    onClick={async () => {
                      await updateDoc(doc(db, "orders", order.id), {
                        status: "completed",
                      });

                      await addDoc(collection(db, "notifications"), {
                        userId: order.buyerId,
                        title: "Order Delivered",
                        message: `Your order for ${order.productName} has been completed.`,
                        type: "COMPLETED",
                        unread: true,
                        createdAt: new Date(),
                      });
                    }}
                    className="flex-1 bg-green-500 text-white h-11 rounded-xl text-[10px] font-black uppercase tracking-widest"
                  >
                    Complete Order
                  </button>

                  <button onClick={() => navigate(`/chat/${order.id}`)}>
                    Chat
                  </button>
                </>
              )}

              {(order.status === "completed" ||
                order.status === "cancelled") && (
                <button className="w-full bg-surface-container-high text-on-surface-variant h-11 rounded-xl text-[10px] font-black uppercase tracking-widest">
                  Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
