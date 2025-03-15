
import { Fingerprint } from "lucide-react";

const FingerprintAnimation = () => {
  return (
    <div className="fingerprint-container">
      <div className="fingerprint-ring"></div>
      <div className="fingerprint-pulse"></div>
      <div className="fingerprint-icon">
        <Fingerprint size={64} />
      </div>
    </div>
  );
};

export default FingerprintAnimation;
