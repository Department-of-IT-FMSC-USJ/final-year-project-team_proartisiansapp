import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, PlusCircle, ArrowUpRight, TrendingUp } from "lucide-react";

import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db, auth } from "@/src/firebase/firebaseConfig";
import { Button } from "@/src/components/Button";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || "",
  );
  const [totalProducts, setTotalProducts] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [latestOrder, setLatestOrder] = useState<any>(null);
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    const q = query(
      collection(db, "products"),
      where("sellerId", "==", auth.currentUser?.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTotalProducts(snapshot.size);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("sellerId", "==", auth.currentUser?.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPendingOrders(
        orders.filter((o: any) => o.status === "pending").length,
      );

      setCompletedOrders(
        orders.filter((o: any) => o.status === "completed").length,
      );

      if (orders.length > 0) {
        setLatestOrder(orders[0]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 space-y-6">
      {successMessage && (
        <div className="mx-6 mt-4 mb-6 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-2xl text-sm font-medium">
          {successMessage}
        </div>
      )}
      <header>
        <h1 className="text-2xl font-black text-on-surface">Store Overview</h1>
        <p className="text-outline text-sm">Last 30 days performance</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          label="Total Products"
          value={totalProducts}
          change="+5%"
          icon={<PackageIcon className="text-primary-container" />}
        />
        <StatsCard
          label="Orders Completed"
          value={completedOrders}
          change="+12%"
          icon={<ShoppingBagIcon className="text-primary-container" />}
        />
      </div>

      <div className="bg-white rounded-[2rem] p-6 shadow-soft border border-outline-variant/10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-primary-container bg-primary-container/10 p-2 rounded-lg">
              <TrendingUp size={20} />
            </span>
            <p className="text-[10px] font-black uppercase tracking-widest text-outline">
              Pending Orders
            </p>
          </div>
          <span className="text-primary-container font-black text-xs">
            +8.4%
          </span>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-on-surface text-4xl font-black">{pendingOrders}</p>
          <div className="flex items-end gap-1.5 h-12">
            <div className="w-2.5 bg-primary-container/20 rounded-t-sm h-1/3"></div>
            <div className="w-2.5 bg-primary-container/40 rounded-t-sm h-1/2"></div>
            <div className="w-2.5 bg-primary-container/60 rounded-t-sm h-1/4"></div>
            <div className="w-2.5 bg-primary-container rounded-t-sm h-full"></div>
            <div className="w-2.5 bg-primary-container/80 rounded-t-sm h-2/3"></div>
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] rounded-[2rem] p-7 relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-primary-container" size={24} />
            <h3 className="text-white font-black text-xl">AI Assistant</h3>
          </div>
          <p className="text-slate-300 text-sm italic mb-8 leading-relaxed max-w-[200px]">
            "Increase the selling rate by 40% generating a product description"
          </p>
          <button className="bg-primary-container text-[#0f172a] px-8 py-3 rounded-full font-black text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95">
            View Recommendations
          </button>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <svg
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.1.7.7 1.3 1.5 1.5 2.4" />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
        </div>
      </div>

      <Button
        className="w-full h-16 rounded-2xl text-lg flex gap-3 shadow-primary-glow"
        onClick={() => navigate("/seller/add-product")}
      >
        <PlusCircle size={22} /> List a New Product
      </Button>

      <div className="space-y-4 pt-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-black uppercase tracking-widest text-outline">
            Recent Activity
          </h4>
          <button
            onClick={() => navigate("/seller/orders")}
            className="text-primary-container text-xs font-bold flex items-center"
          >
            See All <ArrowUpRight size={14} />
          </button>
        </div>
        {latestOrder ? (
          <div className="bg-white rounded-2xl border border-outline-variant/10 p-4 flex items-center gap-4">
            <div className="size-10 bg-primary-container/10 rounded-xl flex items-center justify-center text-primary-container">
              <ShoppingBagIcon className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold">
                Order #{latestOrder.id.slice(0, 5)}
              </p>

              <p className="text-[10px] text-outline">
                {latestOrder.productName}
              </p>
            </div>

            <p className="text-sm font-black">Rs. {latestOrder.totalPrice}</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-outline-variant/10 p-6 text-center">
            <p className="font-bold text-outline">No recent activity yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

const StatsCard = ({ label, value, change, icon }: any) => (
  <div className="bg-white rounded-[2rem] p-5 shadow-soft border border-outline-variant/10 space-y-4">
    <div className="flex justify-between items-start">
      <div className="size-10 rounded-xl bg-primary-container/10 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-primary-container text-xs font-black">
        {change}
      </span>
    </div>
    <div>
      <p className="text-[9px] font-black uppercase tracking-widest text-outline mb-1">
        {label}
      </p>
      <p className="text-3xl font-black text-on-surface">{value}</p>
    </div>
  </div>
);

function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function ShoppingBagIcon(props: any) {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
