import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, MapPin, CheckCircle, Info } from "lucide-react";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { motion } from "motion/react";
import { useUser } from "@/src/context/UserContext";

export default function ShopSetup() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useUser();

  const handleSave = () => {
    setIsAuthenticated(true);
    navigate("/welcome");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden">
      <header className="flex items-center p-4 bg-white border-b border-primary-container/10 sticky top-0 z-20">
        <button onClick={() => navigate(-1)} className="text-on-surface flex size-10 items-center justify-center rounded-full hover:bg-primary-container/10 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-on-surface text-lg font-bold ml-4">Shop Profile Setup</h2>
      </header>

      <main className="flex-1 p-6 space-y-8">
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-primary-container/5 space-y-10">
          {/* Logo Upload */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="size-32 rounded-full overflow-hidden border-4 border-primary-container/20 p-1 bg-surface-container-low">
                <img 
                  src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e03a?auto=format&fit=crop&q=80&w=400" 
                  className="w-full h-full object-cover rounded-full"
                  alt="Shop Preview"
                />
              </div>
              <button className="absolute bottom-0 right-0 size-10 bg-primary-container text-on-primary-container rounded-full shadow-lg border-2 border-white flex items-center justify-center hover:scale-105 transition-transform">
                <Camera size={18} />
              </button>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-on-surface">Shop Logo or Photo</h3>
              <p className="text-sm text-outline">Tell customers about your handmade products.</p>
            </div>
            <Button variant="secondary" size="sm">Upload Photo</Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <Input label="Shop Name" placeholder="e.g. Artisanal Crafts Co." />
            
            <Input 
              label="Location" 
              placeholder="City, Country" 
              leftIcon={<MapPin size={18} className="text-primary-container" />}
            />

            <div className="space-y-2">
              <p className="text-on-surface text-sm font-semibold">Short Shop Description</p>
              <textarea 
                className="w-full rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 text-on-surface focus:ring-2 focus:ring-primary-container/50 focus:border-primary-container outline-none transition-all min-h-[120px] resize-none text-sm leading-relaxed"
                placeholder="Share the story behind your handmade creations..."
              />
              <p className="text-[10px] text-outline italic">Tip: Mention what makes your crafts unique.</p>
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <Button 
              className="w-full h-16 rounded-2xl text-lg shadow-primary-glow" 
              onClick={handleSave}
            >
              <CheckCircle className="mr-2 w-6 h-6" /> Save Shop Profile
            </Button>
            <button 
              onClick={() => handleSave()}
              className="w-full text-outline font-bold text-sm uppercase tracking-widest hover:text-on-surface transition-colors py-2"
            >
              Skip for now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
