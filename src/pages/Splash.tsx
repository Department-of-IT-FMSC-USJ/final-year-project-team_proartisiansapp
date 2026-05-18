import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Brush, Verified } from "lucide-react";
import { useEffect } from "react";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/select-role");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white overflow-hidden items-center justify-center px-8">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12 relative"
      >
        <div className="w-32 h-32 rounded-3xl bg-primary-container/20 flex items-center justify-center animate-pulse-soft">
          <div className="w-24 h-24 rounded-2xl bg-primary-container flex items-center justify-center">
            <Brush className="text-on-primary-container w-12 h-12" />
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white p-1">
          <div className="w-full h-full rounded-full bg-primary-container/20 flex items-center justify-center">
            <Verified className="text-primary w-5 h-5 fill-current" />
          </div>
        </div>
      </motion.div>

      <div className="text-center space-y-4">
        <h1 className="text-on-surface tracking-tight text-4xl font-extrabold leading-tight">
          Pro-Artisan<br />
          <span className="text-primary-container">Marketplace</span>
        </h1>
        <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
          Empowering Artisans Digitally
        </p>
      </div>

      <div className="w-full max-w-[200px] mt-16">
        <div className="h-1.5 w-full bg-primary-container/20 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5 }}
            className="h-full bg-primary-container rounded-full"
          />
        </div>
      </div>

      <div className="absolute bottom-12 text-center">
        <p className="text-outline text-xs font-semibold uppercase tracking-[0.2em]">
          Handcrafted Excellence
        </p>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none -z-10">
        <div className="absolute top-10 left-10 w-48 h-48 bg-primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary rounded-full filter blur-3xl"></div>
      </div>
    </div>
  );
}
