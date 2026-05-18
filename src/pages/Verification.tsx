import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw, Smartphone } from "lucide-react";
import { Button } from "@/src/components/Button";
import { useState, useRef, useEffect } from "react";

export default function Verification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-surface max-w-md mx-auto overflow-x-hidden">
      <header className="flex items-center p-4 justify-between border-b border-outline-variant/20">
        <button onClick={() => navigate(-1)} className="text-on-surface flex size-10 items-center justify-center rounded-full hover:bg-surface-container transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-on-surface text-sm font-bold flex-1 text-center pr-10">OTP Verification</h2>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pt-16">
        <div className="mb-10 flex items-center justify-center size-24 rounded-full bg-primary-container/10 border border-primary-container/20">
          <Smartphone className="text-primary-container w-10 h-10" />
        </div>

        <h3 className="text-on-surface text-2xl font-bold mb-3">Verification Code</h3>
        <p className="text-on-surface-variant text-center max-w-[280px] mb-10">
          Enter the verification code sent to your phone number.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="size-16 text-center text-2xl font-bold bg-white border-2 border-outline-variant/30 rounded-2xl focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 transition-all outline-none"
            />
          ))}
        </div>

        <div className="w-full space-y-6">
          <Button 
            className="w-full h-14" 
            onClick={() => navigate("/registration")}
            disabled={otp.some(d => !d)}
          >
            Verify
          </Button>

          <div className="flex flex-col items-center gap-3">
            <p className="text-outline text-sm">Didn't receive the code?</p>
            <button className="text-primary font-bold inline-flex items-center gap-2 hover:underline">
              <RefreshCw size={14} /> Resend Code
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
