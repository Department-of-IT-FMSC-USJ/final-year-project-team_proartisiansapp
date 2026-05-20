import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, LockKeyhole } from "lucide-react";

import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { useUser } from "@/src/context/UserContext";
import { loginUser, signInWithGoogle } from "@/src/services/authService";

export default function Login() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrorMessage("");

    try {
      setLoading(true);

      await loginUser(email, password);

      setIsAuthenticated(true);

      navigate("/dashboard", {
        state: {
          successMessage: "✅ Login successful!",
        },
      });
    } catch (error: any) {
      setErrorMessage("❌ Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");

    try {
      setLoading(true);

      await signInWithGoogle();

      setIsAuthenticated(true);

      navigate("/dashboard", {
        state: {
          successMessage: "✅ Google login successful!",
        },
      });
    } catch (error: any) {
      setErrorMessage("❌ Google login failed. Try again.");
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
        <div className="mx-6 mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl text-sm font-medium">
          ❌ {errorMessage}
        </div>
      )}

      <div className="flex flex-col px-6 pt-10 flex-1">
        <h1 className="text-on-surface tracking-tight text-[32px] font-bold leading-tight pb-3">
          Welcome Back
        </h1>

        <p className="text-on-surface-variant text-base font-normal leading-normal pb-8">
          Login to manage your artisan store and connect with buyers.
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
          />

          <Input
            label="Password"
            placeholder="••••••••"
            type="password"
            leftIcon={<LockKeyhole size={18} />}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-right pb-4">
          <button className="text-sm text-primary-container font-semibold hover:underline">
            Forgot Password?
          </button>
        </div>

        <div className="flex flex-col py-3">
          <Button
            className="w-full h-16 rounded-2xl text-lg"
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "Login as Seller"}
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
          Don’t have an account?
          <button
            className="text-primary-container font-black ml-1 hover:underline underline-offset-4"
            onClick={() => navigate("/auth")}
          >
            Create Seller Account
          </button>
        </p>
      </div>
    </div>
  );
}
