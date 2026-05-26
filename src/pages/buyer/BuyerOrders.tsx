import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { ArrowLeft } from "lucide-react";

type OrderStatus = "PENDING" | "ACTIVE" | "COMPLETED" | "REJECTED";

interface Order {
  id: string;
  title: string;
  artisan: string;
  artisanAvatar: string;
  price: string;
  image: string;
  status: OrderStatus;
  date: string;
}

const mockOrders: Order[] = [
  {
    id: "1",
    title: "Hand-Forged Steel Knife",
    artisan: "Iron & Fire Studios",
    artisanAvatar: "https://i.pravatar.cc/150?u=1",
    price: "Rs.185.00",
    image:
      "https://images.unsplash.com/photo-1579309252431-2917537b98d2?auto=format&fit=crop&q=80&w=400",
    status: "COMPLETED",
    date: "Oct 24, 2023",
  },
  {
    id: "2",
    title: "Custom Oak Dining Table",
    artisan: "Timber Craftsman",
    artisanAvatar: "https://i.pravatar.cc/150?u=2",
    price: "Rs.1,240.00",
    image:
      "https://images.unsplash.com/photo-1533091726053-27e1f4ef4e13?auto=format&fit=crop&q=80&w=400",
    status: "PENDING",
    date: "Nov 12, 2023",
  },
  {
    id: "3",
    title: "Hand-Thrown Ceramic Set",
    artisan: "Earth & Clay",
    artisanAvatar: "https://i.pravatar.cc/150?u=3",
    price: "Rs.95.00",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400",
    status: "ACTIVE",
    date: "Nov 08, 2023",
  },
  {
    id: "4",
    title: "Woven Leather Bag",
    artisan: "Urban Hide",
    artisanAvatar: "https://i.pravatar.cc/150?u=4",
    price: "Rs.320.00",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400",
    status: "REJECTED",
    date: "Nov 01, 2023",
  },
];

const statusStyles: Record<OrderStatus, string> = {
  COMPLETED: "bg-emerald-100 text-emerald-700",
  PENDING: "bg-amber-100 text-amber-700",
  ACTIVE: "bg-sky-100 text-sky-700",
  REJECTED: "bg-rose-100 text-rose-700",
};

const statusLabels: Record<OrderStatus, string> = {
  COMPLETED: "Delivered",
  PENDING: "Processing",
  ACTIVE: "In Production",
  REJECTED: "Cancelled",
};

export default function BuyerOrders() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Pending", "Active", "Completed"];

  const filtered =
    activeTab === "All"
      ? mockOrders
      : mockOrders.filter(
          (o) => o.status.toLowerCase() === activeTab.toLowerCase(),
        );

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
      <div className="sticky top-[72px] bg-white z-10 border-b border-outline-variant/10">
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
                src={order.image}
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
                  {order.title}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full overflow-hidden">
                    <img
                      src={order.artisanAvatar}
                      alt={order.artisan}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-outline text-sm">{order.artisan}</p>
                </div>
                <p className="font-black text-on-surface">{order.price}</p>
              </div>
              <button
                onClick={() => navigate("/buyer/order-details")}
                className={cn(
                  "w-full h-11 rounded-xl text-sm font-black transition-all active:scale-[0.98]",
                  order.status === "REJECTED"
                    ? "bg-surface-container text-outline"
                    : "bg-primary-container text-on-primary-container",
                )}
              >
                {order.status === "REJECTED"
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
