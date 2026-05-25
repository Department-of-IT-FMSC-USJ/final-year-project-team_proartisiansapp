import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, LockKeyhole } from "lucide-react";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { registerUser, signInWithGoogle } from "@/src/services/authService";

export default function BuyerAuth() {
  const navigate = useNavigate();
  const [buyerName, setBuyerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setErrorMessage("");

    // Name validation
    if (!buyerName.trim()) {
      setErrorMessage("❌ Full name is required");
      return;
    }

    // Email validation
    if (!email.trim()) {
      setErrorMessage("❌ Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("❌ Enter a valid email address");
      return;
    }

    // Phone validation
    if (!phone.trim()) {
      setErrorMessage("❌ Phone number is required");
      return;
    }

    if (!/^\d{9}$/.test(phone)) {
      setErrorMessage("❌ Enter a valid Sri Lankan phone number");
      return;
    }

    // Password validation
    if (password.length < 6) {
      setErrorMessage("❌ Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("❌ Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await registerUser(buyerName, email, password, "buyer", phone);

      navigate("/buyer/dashboard", {
        state: { successMessage: "✅ Buyer account created successfully!" },
      });
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("❌ Email already in use");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("❌ Password is too weak");
      } else {
        setErrorMessage("❌ " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setErrorMessage("");
    try {
      setLoading(true);
      await signInWithGoogle("buyer");
      navigate("/buyer/dashboard", {
        state: { successMessage: "✅ Google registration successful!" },
      });
    } catch {
      setErrorMessage("❌ Google registration failed. Try again.");
    } finally {
      setLoading(false);
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

      {errorMessage && (
        <div className="mx-6 mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl text-sm font-medium">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col px-6 pt-10 flex-1">
        <h1 className="text-on-surface tracking-tight text-[32px] font-bold leading-tight pb-3">
          Join as a Buyer
        </h1>
        <p className="text-on-surface-variant text-base font-normal leading-normal pb-8">
          Create your account and start discovering handmade artisan products.
        </p>

        <div className="flex flex-col gap-6 pb-6">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            required
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
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
            placeholder="771234567"
            type="tel"
            leftIcon={
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span className="text-sm text-gray-500">+94</span>
              </div>
            }
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            {loading ? "Creating Account..." : "Create Buyer Account"}
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
          Already have an account?{" "}
          <button
            className="text-primary-container font-black hover:underline underline-offset-4"
            onClick={() => navigate("/buyer/login")}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
