
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  Calendar, 
  Users, 
  BarChart, 
  FileText, 
  Settings, 
  LogOut,
  Clock,
  Search
} from "lucide-react";
import FingerprintAnimation from "@/components/FingerprintAnimation";
import AppointmentList from "@/components/AppointmentList";
import PatientCard from "@/components/PatientCard";

// Mock data
const MOCK_APPOINTMENTS = [
  { id: "1", name: "John Doe", time: "10:00 AM", reason: "Annual Checkup", status: "upcoming" },
  { id: "2", name: "Jane Smith", time: "11:30 AM", reason: "Follow-up", status: "upcoming" },
  { id: "3", name: "Robert Johnson", time: "1:15 PM", reason: "Vaccination", status: "upcoming" },
  { id: "4", name: "Emily Wilson", time: "2:45 PM", reason: "Blood Test Results", status: "upcoming" },
  { id: "5", name: "Michael Brown", time: "4:00 PM", reason: "Consultation", status: "upcoming" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPatient, setCurrentPatient] = useState<any>(null);
  const [showFingerprint, setShowFingerprint] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clock update
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(clockTimer);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handlePatientSelect = (patient: any) => {
    // Show fingerprint authentication before showing patient details
    setShowFingerprint(true);
    
    // Simulate fingerprint verification
    setTimeout(() => {
      setShowFingerprint(false);
      setCurrentPatient(patient);
    }, 3000);
  };

  const handleNavigateToHealthMonitor = () => {
    navigate("/health-monitor");
  };

  return (
    <div className="min-h-screen bg-medical-gray">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <FingerprintAnimation />
        </div>
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
            <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
              <h1 className="text-xl font-bold text-primary">MediSync</h1>
            </div>
            
            <div className="flex-1 flex flex-col overflow-y-auto py-4 px-3 space-y-1">
              <Button 
                variant="ghost" 
                className={`justify-start ${activeTab === "dashboard" ? "bg-medical-light text-primary" : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className={`justify-start ${activeTab === "appointments" ? "bg-medical-light text-primary" : ""}`}
                onClick={() => setActiveTab("appointments")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Appointments
              </Button>
              <Button 
                variant="ghost" 
                className={`justify-start ${activeTab === "patients" ? "bg-medical-light text-primary" : ""}`}
                onClick={() => setActiveTab("patients")}
              >
                <Users className="mr-2 h-4 w-4" />
                Patients
              </Button>
              <Button 
                variant="ghost" 
                className={`justify-start ${activeTab === "reports" ? "bg-medical-light text-primary" : ""}`}
                onClick={() => setActiveTab("reports")}
              >
                <BarChart className="mr-2 h-4 w-4" />
                Reports
              </Button>
              <Button 
                variant="ghost" 
                className={`justify-start ${activeTab === "documents" ? "bg-medical-light text-primary" : ""}`}
                onClick={() => setActiveTab("documents")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </Button>
              <Button 
                variant="ghost" 
                className={`justify-start ${activeTab === "settings" ? "bg-medical-light text-primary" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="w-full justify-start text-gray-500 hover:text-gray-900"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top header */}
            <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Clock size={18} className="text-gray-500" />
                  <span className="text-sm text-gray-700 font-medium">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-8 h-9 w-[200px] md:w-[300px] rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                    <span className="text-sm font-medium">DR</span>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Main content area */}
            <main className="flex-1 overflow-auto p-4 md:p-6 bg-medical-gray animate-fade-in">
              {showFingerprint ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <FingerprintAnimation />
                    <h2 className="text-xl font-semibold mt-6 text-gray-800">
                      Authenticating Access
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Verifying your identity to access patient records
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
                    <Button onClick={handleNavigateToHealthMonitor}>
                      Health Monitor
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 subtle-glass">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-primary" />
                          Today's Appointments
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <AppointmentList 
                          appointments={MOCK_APPOINTMENTS} 
                          onPatientSelect={handlePatientSelect}
                        />
                      </CardContent>
                    </Card>
                    
                    <Card className="subtle-glass">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center">
                          <Users className="mr-2 h-5 w-5 text-primary" />
                          Current Patient
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {currentPatient ? (
                          <PatientCard patient={currentPatient} />
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Users size={40} className="mx-auto mb-2 opacity-20" />
                            <p>No patient selected</p>
                            <p className="text-sm mt-1">Click on a patient from the appointments list</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
