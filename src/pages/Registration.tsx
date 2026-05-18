import { registerUser } from "@/src/services/authService";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, LockKeyhole, MapPin, ChevronRight, SignalLow, SignalMedium, SignalHigh, Info } from "lucide-react";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { Select } from "@/src/components/Select";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

export default function Registration() {
  const navigate = useNavigate();
  const [skillLevel, setSkillLevel] = useState<"basic" | "intermediate" | "advanced">("basic");
  const [sellerName, setSellerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    setLoading(true);

    await registerUser(
      sellerName,
      email,
      password,
      "seller"
    );

    alert("Registration successful!");

    navigate("/dashboard");

  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden">
      <header className="flex items-center p-4 bg-white border-b border-outline-variant/20 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-on-surface flex size-10 items-center justify-center rounded-full hover:bg-surface-container transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-on-surface text-sm font-bold flex-1 text-center pr-10">Seller Registration</h2>
      </header>

      <main className="flex-1 px-6 py-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-on-surface mb-2">Profile Setup</h2>
          <p className="text-on-surface-variant text-sm">Tell us about your business to get started on the marketplace.</p>
        </div>

        <form className="space-y-6" onSubmit={handleRegister}>
          <Input
            label="Seller Name"
            placeholder="Enter your full name"
            required
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
          />
          <Input
            label="Business Name (Optional)"
            placeholder="Enter business name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <div className="space-y-2">
            <p className="text-on-surface text-sm font-semibold">Phone Number</p>
            <div className="relative group">
              <input 
                disabled 
                value="+1 (555) 012-3456" 
                className="w-full h-14 bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 text-outline cursor-not-allowed" 
              />
              <Lock className="absolute right-4 top-4 text-outline/50 w-5 h-5" />
            </div>
          </div>

          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          
          <Input
            label="Password"
            placeholder="Enter password"
            type="password"
            leftIcon={<LockKeyhole size={18} />}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            leftIcon={<LockKeyhole size={18} />}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Input
            label="Location"
            placeholder="City, Country"
            leftIcon={<MapPin size={18} />}
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <Select label="Product Category" required>
            <option value="" disabled selected>Select category</option>
            <option>Handicrafts</option>
            <option>Jewelry</option>
            <option>Home Decor</option>
            <option>Textiles</option>
            <option>Other</option>
          </Select>

          <div className="space-y-3 pt-2">
            <p className="text-on-surface text-sm font-semibold">Digital Skill Level</p>
            <div className="grid grid-cols-3 gap-3">
              <SkillButton 
                active={skillLevel === "basic"} 
                onClick={() => setSkillLevel("basic")}
                icon={<SignalLow size={18} />}
                label="Basic"
              />
              <SkillButton 
                active={skillLevel === "intermediate"} 
                onClick={() => setSkillLevel("intermediate")}
                icon={<SignalMedium size={18} />}
                label="Intermediate"
              />
              <SkillButton 
                active={skillLevel === "advanced"} 
                onClick={() => setSkillLevel("advanced")}
                icon={<SignalHigh size={18} />}
                label="Advanced"
              />
            </div>
          </div>

          <div className="pt-8">
            <Button type="submit" className="w-full h-16 rounded-2xl text-lg">
              {loading ? "Creating Account..." : "Create Seller Account"}
              {!loading && <ChevronRight className="ml-2 w-5 h-5" />}
            </Button>
          </div>
        </form>

        <div className="bg-surface-container rounded-2xl p-4 border border-outline-variant/10 flex gap-4">
          <Info className="text-primary-container shrink-0" size={20} />
          <p className="text-xs text-on-surface-variant leading-relaxed">
            By creating an account, you agree to our Marketplace Terms of Service and Privacy Policy. Your phone number is verified and cannot be changed during setup.
          </p>
        </div>
      </main>
    </div>
  );
}

function SkillButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all active:scale-95",
        active 
          ? "border-primary-container bg-primary-container/10 text-primary-container" 
          : "border-outline-variant/30 text-on-surface-variant hover:border-outline-variant"
      )}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
