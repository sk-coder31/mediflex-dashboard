
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Heart, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Patient {
  id: string;
  name: string;
  time?: string;
  reason?: string;
}

interface PatientCardProps {
  patient: Patient;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleViewDetails = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      navigate(`/patient/${patient.id}`);
    }, 500);
  };

  // Mock patient details - in a real app, these would come from a database
  const patientDetails = {
    age: "42",
    gender: "Male",
    bloodType: "O+",
    lastVisit: "2 months ago",
    appointmentReason: patient.reason || "Check-up",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-medical-light flex items-center justify-center text-primary">
          <span className="text-lg font-semibold">{patient.name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{patient.name}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={14} className="mr-1" />
            <span>{patientDetails.age} years • {patientDetails.gender}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/70 rounded-lg p-3 border border-gray-100">
          <div className="text-xs font-medium text-gray-500 mb-1">Blood Type</div>
          <div className="flex items-center">
            <Heart className="text-medical-danger h-4 w-4 mr-1" />
            <span className="font-semibold">{patientDetails.bloodType}</span>
          </div>
        </div>
        
        <div className="bg-white/70 rounded-lg p-3 border border-gray-100">
          <div className="text-xs font-medium text-gray-500 mb-1">Last Visit</div>
          <div className="flex items-center">
            <Clock className="text-medical-accent h-4 w-4 mr-1" />
            <span className="text-sm">{patientDetails.lastVisit}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="text-sm font-medium text-gray-700 mb-1">Reason for Visit</div>
        <Badge variant="outline" className="bg-medical-light text-primary">
          {patientDetails.appointmentReason}
        </Badge>
      </div>
      
      <div className="flex flex-col space-y-2 mt-4">
        <Button 
          onClick={handleViewDetails} 
          className="w-full"
          disabled={loading}
        >
          <FileText className="mr-2 h-4 w-4" />
          {loading ? "Loading..." : "View Complete Records"}
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full"
        >
          <Activity className="mr-2 h-4 w-4" />
          Start Consultation
        </Button>
      </div>
    </div>
  );
};

export default PatientCard;
