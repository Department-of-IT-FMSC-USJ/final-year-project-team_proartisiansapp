import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, LockKeyhole } from "lucide-react";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { useUser } from "@/src/context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useUser();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden">
      <header className="flex items-center p-4 pb-2 justify-between">
        <div onClick={() => navigate(-1)} className="text-on-surface flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </div>
        <h2 className="text-on-surface text-sm font-bold flex-1 text-center pr-12">Pro-Artisan Marketplace</h2>
      </header>

      <div className="flex flex-col px-6 pt-10 flex-1">
        <h1 className="text-on-surface tracking-tight text-[32px] font-bold leading-tight pb-3">Welcome Back</h1>
        <p className="text-on-surface-variant text-base font-normal leading-normal pb-8">Enter your details to start selling.</p>

        <div className="flex flex-col gap-6 pb-6">
          <Input 
            label="Phone Number" 
            placeholder="+1 (555) 000-0000" 
            type="tel"
            leftIcon={<Phone size={18} />}
          />
          <Input 
            label="Password" 
            placeholder="••••••••" 
            type="password"
            leftIcon={<LockKeyhole size={18} />}
          />
        </div>

        <div className="flex flex-col py-3">
          <Button className="w-full h-16 rounded-2xl text-lg" onClick={handleLogin}>
            Login
          </Button>
        </div>

        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-outline-variant"></div>
          <span className="px-4 text-xs font-bold text-outline uppercase tracking-widest bg-surface">OR</span>
          <div className="flex-1 border-t border-outline-variant"></div>
        </div>

        <div className="flex flex-col gap-4">
          <Button variant="outline" className="w-full h-16 rounded-2xl border-2 border-outline-variant bg-transparent">
             <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5 mr-3" alt="Google" />
            Continue with Google
          </Button>
        </div>
      </div>

      <div className="mt-auto p-6 text-center">
        <p className="text-xs text-outline font-medium">
          Don't have an account? 
          <button className="text-primary-container font-black ml-1 hover:underline underline-offset-4" onClick={() => navigate("/select-role")}>Join the community</button>
        </p>
      </div>
    </div>
  );
}
