
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, FileText } from "lucide-react";

interface Appointment {
  id: string;
  name: string;
  time: string;
  reason: string;
  status: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
  onPatientSelect: (patient: Appointment) => void;
}

const AppointmentList = ({ appointments, onPatientSelect }: AppointmentListProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (appointment: Appointment) => {
    setSelectedId(appointment.id);
    onPatientSelect(appointment);
  };

  return (
    <div className="space-y-3">
      {appointments.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <Calendar className="mx-auto h-10 w-10 opacity-20 mb-2" />
          <p>No appointments scheduled for today</p>
        </div>
      ) : (
        appointments.map((appointment) => (
          <Card 
            key={appointment.id}
            className={`p-4 transition-all duration-300 border ${
              selectedId === appointment.id 
                ? 'border-primary/50 bg-primary/5' 
                : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50'
            } card-hover`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-medical-light flex items-center justify-center text-primary">
                  <User size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{appointment.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    {appointment.time}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs bg-medical-light text-primary">
                  {appointment.reason}
                </Badge>
                <Button 
                  size="sm" 
                  onClick={() => handleSelect(appointment)}
                  variant={selectedId === appointment.id ? "default" : "outline"}
                  className="flex items-center text-xs h-8"
                >
                  <FileText size={14} className="mr-1" />
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

// Needed for the icon in the component
const Calendar = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
};

export default AppointmentList;
