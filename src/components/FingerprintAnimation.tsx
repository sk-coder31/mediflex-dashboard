
import { Fingerprint } from "lucide-react";
import { useEffect, useState } from "react";

interface FingerprintAnimationProps {
  message?: string;
  onComplete?: () => void;
  duration?: number;
}

const FingerprintAnimation = ({
  message = "Verifying identity...",
  onComplete,
  duration = 3000
}: FingerprintAnimationProps) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, duration / 20);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="fingerprint-container">
      <div className="fingerprint-ring"></div>
      <div 
        className="fingerprint-pulse"
        style={{ 
          opacity: isScanning ? 0.6 + (scanProgress / 250) : 0,
          transform: `scale(${1 + scanProgress / 200})` 
        }}
      ></div>
      <div className="fingerprint-icon">
        <Fingerprint 
          size={64} 
          className={`transition-all duration-300 ${isScanning ? "text-primary" : "text-green-500"}`}
        />
      </div>
      {message && (
        <div className="text-center mt-6 text-gray-700">
          <p className="font-medium">{message}</p>
          {isScanning && (
            <div className="w-48 h-1.5 bg-gray-200 rounded-full mt-2 mx-auto overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FingerprintAnimation;
