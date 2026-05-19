import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, LockKeyhole, MapPin } from "lucide-react";

import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { registerUser, signInWithGoogle } from "@/src/services/authService";
import { useUser } from "@/src/context/UserContext";

export default function Auth() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useUser();

  const [sellerName, setSellerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await registerUser(sellerName, email, password, "seller");

      setIsAuthenticated(true);

      alert("Seller account created successfully!");

      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithGoogle();

      setIsAuthenticated(true);

      alert("Google registration successful!");

      navigate("/dashboard");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden">
      <header className="flex items-center p-4 pb-2 justify-between">
        <div
          onClick={() => navigate(-1)}
          className="text-on-surface flex size-12 shrink-0 items-center justify-start cursor-pointer"
        >
          <ArrowLeft size={24} />
        </div>
        <h2 className="text-on-surface text-sm font-bold flex-1 text-center pr-12">
          Pro-Artisan Marketplace
        </h2>
      </header>

      <div className="flex flex-col px-6 pt-10 flex-1">
        <h1 className="text-on-surface tracking-tight text-[32px] font-bold leading-tight pb-3">
          Join as a Seller
        </h1>

        <p className="text-on-surface-variant text-base font-normal leading-normal pb-8">
          Create your artisan store and start selling today.
        </p>

        <div className="flex flex-col gap-6 pb-6">
          <Input
            label="Seller Name"
            placeholder="Enter your full name"
            required
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
          />

          <Input
            label="Business Name"
            placeholder="Enter business name (optional)"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />

          <Input
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            leftIcon={<Mail size={18} />}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Phone Number"
            placeholder="+94 77 123 4567"
            type="tel"
            leftIcon={<Phone size={18} />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Input
            label="Location"
            placeholder="City / District"
            leftIcon={<MapPin size={18} />}
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            placeholder="Confirm password"
            type="password"
            leftIcon={<LockKeyhole size={18} />}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col py-3">
          <Button
            className="w-full h-16 rounded-2xl text-lg"
            onClick={handleRegister}
          >
            {loading ? "Creating Account..." : "Create Seller Account"}
          </Button>
        </div>

        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-outline-variant"></div>
          <span className="px-4 text-xs font-bold text-outline uppercase tracking-widest bg-surface">
            OR
          </span>
          <div className="flex-1 border-t border-outline-variant"></div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full h-16 rounded-2xl border-2 border-outline-variant bg-white hover:bg-gray-50 text-base font-semibold"
            onClick={handleGoogleRegister}
          >
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
              className="w-5 h-5 mr-3"
              alt="Google"
            />
            Register with Google
          </Button>
        </div>
      </div>

      <div className="mt-auto p-6 text-center">
        <p className="text-xs text-outline font-medium">
          Already have an account?
          <button
            className="text-primary-container font-black ml-1 hover:underline underline-offset-4"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
