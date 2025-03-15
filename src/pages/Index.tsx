
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/LoginForm";

interface IndexProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Index = ({ setIsLoggedIn }: IndexProps) => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleLogin = (aadhaarNumber: string) => {
    // In a real app, authenticate with a server
    if (aadhaarNumber && aadhaarNumber.length === 12) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/dashboard");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-medical-gray p-4 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="glass-card max-w-md w-full p-8 rounded-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MediSync</h1>
          <p className="text-gray-600">Advanced Healthcare Management</p>
        </div>
        
        <LoginForm onLogin={handleLogin} />
        
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Secure login for authorized medical personnel.</p>
          <p className="mt-1">Protected by advanced authentication.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
