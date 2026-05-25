import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, LockKeyhole } from "lucide-react";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { loginUser, signInWithGoogle } from "@/src/services/authService";

export default function BuyerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const handleLogin = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setMissingFields([]);

    const missing = [];

    if (!email) missing.push("email");
    if (!password) missing.push("password");

    if (missing.length > 0) {
      setMissingFields(missing);

      const fieldNames = missing.map((field) => {
        switch (field) {
          case "email":
            return "Email";
          case "password":
            return "Password";
          default:
            return field;
        }
      });

      setErrorMessage(`❌ Missing: ${fieldNames.join(", ")}`);

      setTimeout(() => {
        setErrorMessage("");
        setMissingFields([]);
      }, 3000);

      return;
    }

    try {
      setLoading(true);

      await loginUser(email, password);

      setSuccessMessage("✅ Login successful!");

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/buyer/dashboard");
      }, 2000);
    } catch {
      setErrorMessage("❌ Incorrect email or password");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      setLoading(true);

      await signInWithGoogle("buyer");

      setSuccessMessage("✅ Google login successful!");

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/buyer/dashboard");
      }, 2000);
    } catch {
      setErrorMessage("❌ Google login failed. Try again.");

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
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

      {/* Error Message */}
      {errorMessage && (
        <div className="mx-6 mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl text-sm font-medium">
          {errorMessage}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="mx-6 mb-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-2xl text-sm font-medium">
          {successMessage}
        </div>
      )}

      <div className="flex flex-col px-6 pt-10 flex-1">
        <h1 className="text-on-surface tracking-tight text-[32px] font-bold leading-tight pb-3">
          Welcome Back
        </h1>

        <p className="text-on-surface-variant text-base font-normal leading-normal pb-8">
          Login to browse and order from artisans across Sri Lanka.
        </p>

        <div className="flex flex-col gap-6 pb-6">
          <Input
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            leftIcon={<Mail size={18} />}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={
              missingFields.includes("email")
                ? "border-red-500 focus:ring-red-500"
                : ""
            }
          />

          <Input
            label="Password"
            placeholder="••••••••"
            type="password"
            leftIcon={<LockKeyhole size={18} />}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={
              missingFields.includes("password")
                ? "border-red-500 focus:ring-red-500"
                : ""
            }
          />
        </div>

        <div className="text-right pb-6">
          <button className="text-sm text-primary-container font-semibold hover:underline">
            Forgot Password?
          </button>
        </div>

        <div className="flex flex-col py-3">
          <Button
            className="w-full h-16 rounded-2xl text-lg"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login as Buyer"}
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
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
              className="w-5 h-5 mr-3"
              alt="Google"
            />
            Continue with Google
          </Button>
        </div>
      </div>

      <div className="mt-auto p-6 text-center">
        <p className="text-xs text-outline font-medium">
          Don't have an account?{" "}
          <button
            className="text-primary-container font-black hover:underline underline-offset-4"
            onClick={() => navigate("/buyer/auth")}
          >
            Create Buyer Account
          </button>
        </p>
      </div>
    </div>
  );
}
