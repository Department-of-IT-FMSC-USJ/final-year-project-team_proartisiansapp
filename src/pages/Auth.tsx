import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { motion } from "motion/react";

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden">
      <header className="flex items-center p-4 justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-on-surface flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-on-surface text-sm font-bold flex-1 text-center pr-12">Seller Authentication</h2>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="w-full text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-container/10 text-primary-container mb-6">
            <StoreIcon className="w-10 h-10" />
          </div>
          <h1 className="text-on-surface text-3xl font-bold mb-3 tracking-tight">Welcome Seller</h1>
          <p className="text-on-surface-variant text-base">Enter your details to start selling.</p>
        </div>

        <div className="w-full space-y-8">
          <Input 
            label="Phone Number" 
            placeholder="+1 (555) 000-0000" 
            type="tel"
            leftIcon={<Phone size={18} />}
          />

          <Button 
            className="w-full h-14" 
            onClick={() => navigate("/verification")}
          >
            Send OTP <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-1 border-t border-outline-variant"></div>
            <span className="px-4 text-xs font-bold text-outline uppercase tracking-widest bg-surface">OR</span>
            <div className="flex-1 border-t border-outline-variant"></div>
          </div>

          <Button variant="outline" className="w-full h-14 bg-white border-outline-variant">
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5 mr-3" alt="Google" />
            Continue with Google
          </Button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-on-surface-variant text-sm">
            Already have an account? 
            <button className="text-primary-container font-bold hover:underline ml-1" onClick={() => navigate("/login")}>Log in</button>
          </p>
        </div>
      </main>

      <footer className="p-8 mt-auto flex flex-col items-center">
        <div className="flex justify-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-outline-variant"></div>
          <div className="w-4 h-2 rounded-full bg-primary-container"></div>
          <div className="w-2 h-2 rounded-full bg-outline-variant"></div>
        </div>
        <p className="text-outline text-[10px] text-center max-w-[200px]">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </footer>
    </div>
  );
}

function StoreIcon(props: any) {
  return (
    <svg 
      {...props}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
    </svg>
  );
}
