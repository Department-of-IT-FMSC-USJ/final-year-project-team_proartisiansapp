import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingBag, Heart, Sparkles, Bell, ChevronRight } from "lucide-react";
import BuyerSidebar from "../../components/BuyerSidebar";

export default function BuyerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || "",
  );

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="flex flex-col min-h-screen bg-surface max-w-md mx-auto pb-10">
      {/* Success Message */}
      {successMessage && (
        <div className="mx-4 mt-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-2xl text-sm font-medium">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6 pb-2">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="size-12 rounded-2xl bg-white border border-outline-variant/20 flex items-center justify-center shadow-soft"
          >
            ☰
          </button>

          <div>
            <p className="text-sm text-outline">Welcome back 👋</p>
            <h1 className="text-2xl font-black text-on-surface">
              Explore Artisans
            </h1>
          </div>
        </div>

        {/* Notifications */}
        <button
          onClick={() => navigate("/buyer/notifications")}
          className="size-12 rounded-2xl bg-white border border-outline-variant/20 flex items-center justify-center shadow-soft"
        >
          <Bell size={20} />
        </button>
      </header>

      {/* KPI Cards */}
      <section className="px-4 pt-4 grid grid-cols-2 gap-4">
        <button
          onClick={() => navigate("/buyer/orders")}
          className="bg-white rounded-3xl p-5 border border-outline-variant/10 shadow-soft flex flex-col items-start gap-3"
        >
          <div className="size-12 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary-container">
            <ShoppingBag size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-on-surface">4</p>
            <p className="text-sm text-outline font-medium">Pending Orders</p>
          </div>
        </button>

        <button
          onClick={() => navigate("/buyer/saved")}
          className="bg-white rounded-3xl p-5 border border-outline-variant/10 shadow-soft flex flex-col items-start gap-3"
        >
          <div className="size-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-500">
            <Heart size={22} />
          </div>
          <div>
            <p className="text-2xl font-black text-on-surface">12</p>
            <p className="text-sm text-outline font-medium">Wishlist Items</p>
          </div>
        </button>
      </section>

      {/* Orders Summary */}
      <section className="px-4 pt-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-outline mb-4">
          Current Orders
        </h2>

        <div className="bg-white rounded-3xl border border-outline-variant/10 shadow-soft p-5 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=300"
                alt="Order"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="text-lg font-black text-on-surface">
                Ceramic Vase Order
              </p>
              <p className="text-sm text-outline">
                Artisan Julian • In Production
              </p>

              <span className="inline-block mt-2 px-3 py-1 rounded-xl bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-wider">
                Active
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/buyer/orders")}
            className="w-full h-12 rounded-2xl bg-primary-container text-on-primary-container font-black flex items-center justify-center gap-2"
          >
            View Orders
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* AI Assistant */}
      <section className="px-4 pt-6">
        <div className="bg-primary-container/10 rounded-3xl p-5 border border-primary-container/20 shadow-soft">
          <div className="flex items-start gap-4">
            <div className="size-14 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center">
              <Sparkles size={24} />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-black text-on-surface">
                AI Shopping Assistant
              </h3>
              <p className="text-sm text-outline mt-1">
                Need gift ideas or custom handmade product suggestions?
              </p>

              <button
                onClick={() => navigate("/buyer/assistant")}
                className="mt-4 h-11 px-5 rounded-2xl bg-primary-container text-on-primary-container font-black text-sm"
              >
                Ask AI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className="px-4 pt-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-outline mb-4">
          Recommended for You
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl overflow-hidden border border-outline-variant/10 shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=300"
              alt="Wood Craft"
              className="w-full h-28 object-cover"
            />
            <div className="p-4">
              <p className="text-sm font-black">Wooden Decor</p>
              <p className="text-xs text-outline">Rs. 3,500</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-outline-variant/10 shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=300"
              alt="Jewelry"
              className="w-full h-28 object-cover"
            />
            <div className="p-4">
              <p className="text-sm font-black">Handmade Jewelry</p>
              <p className="text-xs text-outline">Rs. 2,800</p>
            </div>
          </div>
        </div>
      </section>
      {sidebarOpen && <BuyerSidebar onClose={() => setSidebarOpen(false)} />}
    </div>
  );
}
