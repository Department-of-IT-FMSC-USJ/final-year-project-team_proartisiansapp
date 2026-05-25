import { useNavigate } from "react-router-dom";
import { ShoppingBag, Store, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/src/components/Button";
import { useUser } from "@/src/context/UserContext";

export default function RoleSelection() {
  const navigate = useNavigate();
  const { setRole } = useUser();

  const handleSelect = (role: "buyer" | "seller") => {
    setRole(role);
    if (role === "seller") {
      navigate("/seller/auth");
    } else if (role === "buyer") {
      navigate("/buyer/auth");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface overflow-x-hidden max-w-md mx-auto">
      <header className="flex items-center p-4 pb-2 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="text-on-surface flex size-12 shrink-0 items-center justify-start cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-on-surface text-[10px] font-bold uppercase tracking-[0.2em] flex-1 text-center pr-12">
          Join Pro-Artisan
        </h2>
      </header>

      <div className="flex flex-col items-center px-4 pt-10 pb-8">
        <h1 className="text-on-surface tracking-tight text-3xl font-bold leading-tight text-center pb-3">
          Choose your role
        </h1>
        <p className="text-on-surface-variant text-base font-normal leading-normal text-center">
          How would you like to use our marketplace?
        </p>
      </div>

      <main className="flex-1 w-full px-4 pb-12 space-y-6">
        {/* Buyer Card */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => handleSelect("buyer")}
          className="group flex flex-col items-stretch rounded-2xl shadow-soft border border-outline-variant bg-surface-container-lowest hover:border-primary-container transition-all cursor-pointer overflow-hidden"
        >
          <div className="w-full bg-surface-container aspect-[16/10] flex items-center justify-center relative">
            <img
              src="https://images.unsplash.com/photo-1590642916589-592bca10dfbf?auto=format&fit=crop&q=80&w=800"
              className="absolute inset-0 w-full h-full object-cover"
              alt="Pottery"
            />
            <div className="absolute inset-0 bg-primary-container/10 group-hover:bg-primary-container/20 transition-colors"></div>
            <div className="z-10 bg-white p-4 rounded-full shadow-lg">
              <ShoppingBag className="text-primary-container w-8 h-8" />
            </div>
          </div>
          <div className="flex flex-col gap-6 p-6">
            <div className="space-y-2">
              <h3 className="text-on-surface text-2xl font-bold">Buyer</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Browse and purchase unique, handmade artisan products from
                creators around the world.
              </p>
            </div>
            <Button className="w-full">Continue as Buyer</Button>
          </div>
        </motion.div>

        {/* Seller Card */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => handleSelect("seller")}
          className="group flex flex-col items-stretch rounded-2xl shadow-soft border border-outline-variant bg-surface-container-lowest hover:border-primary-container transition-all cursor-pointer overflow-hidden"
        >
          <div className="w-full bg-surface-container aspect-[16/10] flex items-center justify-center relative">
            <img
              src="https://images.unsplash.com/photo-1520038410233-7141ec7ae74d?auto=format&fit=crop&q=80&w=800"
              className="absolute inset-0 w-full h-full object-cover"
              alt="Workshop"
            />
            <div className="absolute inset-0 bg-primary-container/10 group-hover:bg-primary-container/20 transition-colors"></div>
            <div className="z-10 bg-white p-4 rounded-full shadow-lg">
              <Store className="text-primary-container w-8 h-8" />
            </div>
          </div>
          <div className="flex flex-col gap-6 p-6">
            <div className="space-y-2">
              <h3 className="text-on-surface text-2xl font-bold">Seller</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Sell your handmade products, manage your inventory, and grow
                your artisan business.
              </p>
            </div>
            <Button className="w-full">Continue as Seller</Button>
          </div>
        </motion.div>
      </main>

      <footer className="p-6 text-center">
        <p className="text-outline text-xs">
          By continuing, you agree to our{" "}
          <a className="underline hover:text-primary-container" href="#">
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="underline hover:text-primary-container" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
