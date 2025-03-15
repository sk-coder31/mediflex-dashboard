
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Fingerprint } from "lucide-react";
import FingerprintAnimation from "./FingerprintAnimation";

interface LoginFormProps {
  onLogin: (aadhaarNumber: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [showFingerprint, setShowFingerprint] = useState(false);
  const [error, setError] = useState("");
  const [isLocationVerified, setIsLocationVerified] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      setError("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    
    setError("");
    setShowFingerprint(true);
    
    // Check location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocationVerified(true);
          // In a real app, you would send these coordinates to your server
          console.log("Location verified:", position.coords.latitude, position.coords.longitude);
          
          // Simulate fingerprint verification delay
          setTimeout(() => {
            setShowFingerprint(false);
            onLogin(aadhaarNumber);
          }, 3000);
        },
        (err) => {
          setError("Location verification failed. Please enable location services.");
          setShowFingerprint(false);
          console.error("Location error:", err);
        }
      );
    } else {
      setError("Location services not supported by your browser");
      setShowFingerprint(false);
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      {showFingerprint ? (
        <div className="py-8 space-y-6 animate-fade-in">
          <FingerprintAnimation />
          <p className="text-center text-gray-700 font-medium mt-4">
            {isLocationVerified ? "Verifying identity..." : "Verifying location..."}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700">
              Aadhaar Card Number
            </label>
            <Input
              id="aadhaar"
              placeholder="Enter 12-digit Aadhaar Number"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
              className="bg-white border border-gray-300"
              type="text"
              maxLength={12}
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <Button 
            type="submit"
            className="w-full group relative overflow-hidden bg-primary hover:bg-primary/90 text-white"
          >
            <span className="absolute right-2 group-hover:translate-x-1 transition-transform">
              <Fingerprint size={20} />
            </span>
            <span className="mr-2">Authenticate</span>
          </Button>
        </form>
      )}
    </Card>
  );
};

export default LoginForm;
