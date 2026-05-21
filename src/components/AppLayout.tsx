import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, User, Menu, Bell } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { auth, db } from "@/src/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

// Custom icons based on design
const NavIcon = ({ icon: Icon, active }: { icon: any; active: boolean }) => (
  <Icon
    className={cn(
      "w-6 h-6",
      active ? "text-primary-container fill-current" : "text-outline",
    )}
  />
);

export const AppLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [shopData, setShopData] = useState({
    shopName: "",
    location: "",
    photoURL: "",
  });
  const handleLogout = async () => {
    try {
      setIsMenuOpen(false);
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log("Logout failed");
    }
  };
  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/inventory", label: "Inventory", icon: PackageIcon },
    { to: "/orders", label: "Orders", icon: ShoppingBag },
    { to: "/profile", label: "Profile", icon: User },
  ];

  // Hide nav on specific pages if needed
  const hideNav = [
    "/",
    "/select-role",
    "/auth",
    "/verification",
    "/registration",
    "/shop-setup",
    "/welcome",
  ].includes(location.pathname);

  useEffect(() => {
    const fetchShopData = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const shopRef = doc(db, "shops", user.uid);
      const shopSnap = await getDoc(shopRef);

      if (shopSnap.exists()) {
        setShopData(shopSnap.data() as any);
      }
    };

    fetchShopData();
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden border-x border-outline-variant/10">
      {!hideNav && (
        <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="size-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
            >
              <Menu size={24} className="text-on-surface-variant" />
            </button>
            <div className="size-10 rounded-full border-2 border-primary-container/20 overflow-hidden">
              <img
                src={shopData.photoURL || "https://via.placeholder.com/150"}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-bold leading-none">
                {shopData.shopName || "Loading..."}
              </p>
              <p className="text-[10px] text-primary-container font-bold uppercase tracking-wider">
                Pro Seller
              </p>
            </div>
          </div>
          <button className="relative size-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 size-2 bg-primary-container rounded-full border border-white"></span>
          </button>
        </header>
      )}

      <main className={cn("flex-1", !hideNav && "pb-24")}>
        <Outlet />
      </main>

      {/* {!hideNav && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md flex border-t border-outline-variant/10 bg-white/95 backdrop-blur-lg px-4 pb-8 pt-3 z-40">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-1 flex-col items-center justify-center gap-1 transition-all",
                  isActive
                    ? "text-primary-container scale-105"
                    : "text-outline",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={24}
                    className={cn(isActive && "fill-current")}
                  />
                  <span
                    className={cn(
                      "text-[9px] font-bold uppercase tracking-wider",
                      isActive ? "text-primary-container" : "text-outline",
                    )}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      )} */}

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[320px] bg-white z-[70] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-3xl overflow-hidden border-2 border-primary-container/20">
                    <img
                      src={
                        shopData.photoURL || "https://via.placeholder.com/150"
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {shopData.shopName || "Loading..."}
                    </h3>
                    <div className="bg-primary-container/10 text-primary-container px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <CheckCircle size={10} className="fill-current" />
                      <span className="text-[9px] font-black uppercase tracking-widest">
                        Pro Seller
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-container"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-2 flex-1">
                <SideNavItem
                  icon={LayoutDashboard}
                  label="Dashboard"
                  active={location.pathname === "/dashboard"}
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMenuOpen(false);
                  }}
                />
                <SideNavItem
                  icon={PackageIcon}
                  label="My Inventory"
                  active={location.pathname === "/inventory"}
                  onClick={() => {
                    navigate("/inventory");
                    setIsMenuOpen(false);
                  }}
                />
                <SideNavItem
                  icon={ShoppingBag}
                  label="Orders"
                  badge="3"
                  active={location.pathname === "/orders"}
                  onClick={() => {
                    navigate("/orders");
                    setIsMenuOpen(false);
                  }}
                />
                <SideNavItem
                  icon={User}
                  label="Profile"
                  active={location.pathname === "/profile"}
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                />
                <div className="h-px bg-outline-variant/20 my-4 mx-2" />
                <SideNavItem
                  icon={HelpCircleIcon}
                  label="Help & Support"
                  onClick={() => {
                    navigate("/help");
                    setIsMenuOpen(false);
                  }}
                />
              </div>

              <div className="pt-6 border-t border-outline-variant/20 space-y-6">
                <Button
                  variant="outline"
                  className="w-full h-14 rounded-2xl bg-surface-container-low border-none font-bold text-on-surface"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 text-error" size={20} /> Logout
                </Button>
                <div className="text-center">
                  <p className="text-[10px] text-outline font-medium tracking-wide">
                    Artisan Hub v2.4.0
                  </p>
                  <div className="flex justify-center gap-4 mt-2">
                    <button className="text-[9px] font-black uppercase tracking-tighter text-primary-container underline">
                      Privacy
                    </button>
                    <button className="text-[9px] font-black uppercase tracking-tighter text-primary-container underline">
                      Terms
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const SideNavItem = ({ icon: Icon, label, active, badge, onClick }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-4 w-full p-4 rounded-2xl text-left transition-all active:scale-[0.98]",
      active
        ? "bg-primary-container text-on-primary-container"
        : "text-on-surface-variant hover:bg-surface-container-low",
    )}
  >
    <Icon size={22} className={cn(active && "fill-current")} />
    <span className="font-semibold text-sm">{label}</span>
    {badge && (
      <span className="ml-auto bg-error text-on-error text-[10px] px-2 py-0.5 rounded-full font-black">
        {badge}
      </span>
    )}
    {!badge && <ChevronRight size={16} className="ml-auto opacity-30" />}
  </button>
);

// Fallback Icons
function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      className={cn("w-6 h-6", props.className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function HelpCircleIcon(props: any) {
  return (
    <svg
      {...props}
      className={cn("w-6 h-6", props.className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

import { CheckCircle, X, ChevronRight, LogOut } from "lucide-react";
