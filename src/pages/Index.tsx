
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";
import FingerprintAnimation from "@/components/FingerprintAnimation";
import { toast } from "sonner";

interface IndexProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Index = ({ setIsLoggedIn }: IndexProps) => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [showFingerprint, setShowFingerprint] = useState(false);
  const [isLocationVerified, setIsLocationVerified] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleLogin = (aadhaarNumber: string) => {
    // Basic validation
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      toast.error("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    
    setShowFingerprint(true);
    
    // Check location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocationVerified(true);
          // In a real app, you would send these coordinates to your server
          console.log("Location verified:", position.coords.latitude, position.coords.longitude);
          
          // Fingerprint authentication is handled in the LoginForm component
        },
        (err) => {
          toast.error("Location verification failed. Please enable location services.");
          setShowFingerprint(false);
          console.error("Location error:", err);
        }
      );
    } else {
      toast.error("Location services not supported by your browser");
      setShowFingerprint(false);
    }
  };

  const handleAuthenticationComplete = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    navigate("/dashboard");
    toast.success("Authentication successful");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-medical-gray p-4 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="glass-card max-w-md w-full p-8 rounded-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MediSync</h1>
          <p className="text-gray-600">Advanced Healthcare Management</p>
        </div>
        
        {showFingerprint ? (
          <div className="py-8 space-y-6 animate-fade-in">
            <FingerprintAnimation 
              message={isLocationVerified ? "Verifying identity..." : "Verifying location..."}
              onComplete={handleAuthenticationComplete}
              duration={3000}
            />
          </div>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
        
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Secure login for authorized medical personnel.</p>
          <p className="mt-1">Protected by advanced authentication.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
