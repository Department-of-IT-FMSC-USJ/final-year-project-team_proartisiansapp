import { useNavigate } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  ShoppingBag,
  User,
  CircleHelp,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function BuyerSidebar({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // add firebase logout later
    navigate("/buyer/login");
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Blur Background */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-[320px] bg-white shadow-2xl p-6 flex flex-col transform transition-transform duration-300">
        {/* Top */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/50"
              className="w-full h-full object-cover"
              alt="User"
            />

            <div>
              <h2 className="text-xl font-black text-on-surface">
                Kasun Rodrigo
              </h2>
              <p className="text-sm text-outline">+94 77 123 4567</p>

              <span className="inline-block mt-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                Buyer
              </span>
            </div>
          </div>

          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col gap-2">
          <NavItem
            icon={<LayoutDashboard size={22} />}
            label="Dashboard"
            onClick={() => navigate("/buyer/dashboard")}
          />

          <NavItem
            icon={<ShoppingBag size={22} />}
            label="My Orders"
            onClick={() => navigate("/buyer/orders")}
          />

          <NavItem
            icon={<User size={22} />}
            label="Profile"
            onClick={() => navigate("/buyer/profile")}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-outline-variant my-6"></div>

        {/* Help */}
        <NavItem
          icon={<CircleHelp size={22} />}
          label="Help & Support"
          onClick={() => navigate("/buyer/support")}
        />

        {/* Bottom */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full h-16 rounded-3xl bg-surface-container-low flex items-center justify-center gap-3 font-black text-red-600 border border-outline-variant/20"
          >
            <LogOut size={22} />
            LOGOUT
          </button>

          <div className="text-center mt-8">
            <p className="text-xs text-outline font-medium">
              Pro Artisan v2.4.0
            </p>

            <div className="flex justify-center gap-4 mt-3 text-xs font-bold text-primary">
              <button>PRIVACY</button>
              <button>TERMS</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-4 rounded-2xl hover:bg-slate-50 transition-all"
    >
      <div className="flex items-center gap-4">
        <div className="text-on-surface">{icon}</div>
        <span className="font-semibold text-lg">{label}</span>
      </div>

      <ChevronRight size={18} className="text-outline" />
    </button>
  );
}
