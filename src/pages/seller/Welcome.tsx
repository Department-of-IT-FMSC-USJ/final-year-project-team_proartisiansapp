import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle, LayoutDashboard, HelpCircle } from "lucide-react";
import { Button } from "@/src/components/Button";
import { motion } from "motion/react";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden">
      <header className="flex items-center p-4 justify-between border-b border-primary-container/10">
        <button onClick={() => navigate(-1)} className="text-on-surface flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-surface-container transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-on-surface text-sm font-bold flex-1 text-center pr-12">Welcome</h2>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-soft mb-10 border border-primary-container/10"
        >
          <img 
            src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e03a?auto=format&fit=crop&q=80&w=800" 
            className="w-full h-full object-cover"
            alt="Artisan Studio"
          />
        </motion.div>

        <h1 className="text-on-surface text-[28px] font-bold leading-tight mb-4 px-4">
          Welcome to Pro-Artisan Marketplace!
        </h1>
        <p className="text-on-surface-variant text-base leading-relaxed mb-10 px-4">
          You can now start listing your handmade products and reach more customers. Build your brand and share your crafts with the world.
        </p>

        <div className="w-full space-y-4">
          <Button className="w-full h-16 rounded-2xl text-lg flex gap-3" onClick={() => navigate("/add-product")}>
            <PlusCircle size={22} /> Add Your First Product
          </Button>
          <Button variant="secondary" className="w-full h-16 rounded-2xl text-lg flex gap-3 border border-primary-container/20" onClick={() => navigate("/dashboard")}>
            <LayoutDashboard size={22} /> Go to Seller Dashboard
          </Button>
        </div>

        <div className="mt-12 flex items-center gap-2">
          <p className="text-outline text-xs">Need help setting up your shop?</p>
          <button className="text-primary-container font-bold text-xs underline decoration-primary-container/30">
            View our Seller Guide
          </button>
        </div>
      </main>
    </div>
  );
}
