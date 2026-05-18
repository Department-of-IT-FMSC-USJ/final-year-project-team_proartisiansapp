import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit3, CheckCircle, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

const PRODUCTS = [
  {
    id: 1,
    name: "Hand-Carved Walnut Bowl",
    price: "Rs.450.00",
    stock: "4 units available",
    status: "Active",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Boho Macrame Wall Art",
    price: "Rs.1200.00",
    stock: "1 unit available",
    status: "Active",
    image: "https://images.unsplash.com/photo-1520038410233-7141ec7ae74d?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Rustic Leather Journal",
    price: "Rs.1800.00",
    stock: "Only 1 left!",
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400",
  }
];

export default function Inventory() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-outline-variant/10 sticky top-[72px] z-30">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/dashboard")} className="size-10 flex items-center justify-center rounded-full hover:bg-surface-container">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-black">My Products</h2>
          </div>
          <button 
            onClick={() => navigate("/add-product")}
            className="size-10 flex items-center justify-center rounded-full bg-primary-container/10 text-primary-container hover:bg-primary-container/20 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>
        <div className="flex px-4 gap-8">
          {["Active", "Sold", "Drafts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 pt-2 text-sm font-bold border-b-2 transition-all",
                activeTab === tab ? "border-primary-container text-on-surface" : "border-transparent text-outline"
              )}
            >
              {tab} ({tab === "Active" ? "12" : tab === "Sold" ? "45" : "3"})
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 p-4 space-y-4">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl shadow-soft border border-outline-variant/10 overflow-hidden group">
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:w-40 aspect-square shrink-0 overflow-hidden bg-surface-container">
                <img src={product.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={product.name} />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-on-surface leading-tight mr-2">{product.name}</h3>
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full",
                      product.status === "Active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    )}>
                      {product.status}
                    </span>
                  </div>
                  <p className="text-primary-container font-black text-lg">{product.price}</p>
                  <p className={cn("text-[10px] font-bold", product.status === "Low Stock" ? "text-error" : "text-outline")}>
                    {product.stock}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-outline-variant/10">
                  <button className="flex-1 h-10 flex items-center justify-center gap-2 bg-primary-container text-[#0f172a] rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform">
                    <Edit3 size={14} /> Edit
                  </button>
                  <button className="flex-1 h-10 flex items-center justify-center gap-2 bg-surface-container-high text-on-surface-variant rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform">
                    <CheckCircle size={14} /> Sold
                  </button>
                  <button className="size-10 flex items-center justify-center bg-error-container/10 text-error rounded-xl hover:bg-error-container/20 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="h-10" />
      </main>
    </div>
  );
}
