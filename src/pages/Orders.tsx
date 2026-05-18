import { useNavigate } from "react-router-dom";
import { Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <div className="p-4 space-y-6">
      <header>
        <h1 className="text-2xl font-black text-on-surface">Manage Orders</h1>
        <p className="text-outline text-sm">Keep track of your artisan sales</p>
      </header>

      <div className="flex bg-surface-container-low p-1 rounded-2xl">
        {["Active", "Completed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
              activeTab === tab ? "bg-white shadow-soft text-primary-container" : "text-outline"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-3xl p-5 border border-outline-variant/10 shadow-soft space-y-4">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="size-12 rounded-2xl bg-surface-container relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=100" className="object-cover w-full h-full" />
                    </div>
                    <div>
                        <p className="text-sm font-black">#ORD-2983{i}</p>
                        <p className="text-[10px] text-outline font-bold">2 items • Rs. 1,240.00</p>
                    </div>
                </div>
                <span className="bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg flex items-center gap-1">
                    <Clock size={10} /> Processing
                </span>
            </div>
            <div className="flex gap-2">
                <button className="flex-1 bg-primary-container text-[#0f172a] h-11 rounded-xl text-[10px] font-black uppercase tracking-widest">Ship Order</button>
                <button className="flex-1 bg-surface-container-high text-on-surface-variant h-11 rounded-xl text-[10px] font-black uppercase tracking-widest">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
