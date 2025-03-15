
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Heart, 
  Activity, 
  Weight, 
  Gauge, 
  Pill, 
  FileText, 
  UploadCloud 
} from "lucide-react";
import FingerprintAnimation from "@/components/FingerprintAnimation";
import VitalsChart from "@/components/VitalsChart";
import MedicationHistory from "@/components/MedicationHistory";
import UploadDocuments from "@/components/UploadDocuments";

// Mocked patient data - would come from a database in a real app
const getMockPatientData = (id: string) => ({
  id,
  name: "John Doe",
  age: 42,
  gender: "Male",
  aadhaarNumber: "XXXX-XXXX-" + id.padStart(4, '0'),
  bloodType: "O+",
  height: "175 cm",
  weight: "78 kg",
  bmi: 25.5,
  lastVisit: "2 months ago",
  isDiabetic: false,
  vitals: {
    bloodPressure: [
      { date: "Jan", systolic: 120, diastolic: 80 },
      { date: "Feb", systolic: 118, diastolic: 78 },
      { date: "Mar", systolic: 122, diastolic: 82 },
      { date: "Apr", systolic: 125, diastolic: 85 },
      { date: "May", systolic: 121, diastolic: 79 },
    ],
    weight: [
      { date: "Jan", value: 80 },
      { date: "Feb", value: 79 },
      { date: "Mar", value: 78.5 },
      { date: "Apr", value: 78 },
      { date: "May", value: 78 }
    ],
    sugarLevels: [
      { date: "Jan", value: 98 },
      { date: "Feb", value: 102 },
      { date: "Mar", value: 95 },
      { date: "Apr", value: 100 },
      { date: "May", value: 97 }
    ],
    oxygenLevels: [
      { date: "Jan", value: 97 },
      { date: "Feb", value: 98 },
      { date: "Mar", value: 98 },
      { date: "Apr", value: 99 },
      { date: "May", value: 98 }
    ]
  },
  medicalHistory: [
    { date: "2022-05-15", hospital: "City General Hospital", condition: "Influenza", doctor: "Dr. Sarah Johnson" },
    { date: "2021-11-03", hospital: "St. Mary's Medical Center", condition: "Sprained Ankle", doctor: "Dr. Robert Chen" },
    { date: "2020-08-22", hospital: "County Health Services", condition: "Annual Checkup", doctor: "Dr. James Wilson" }
  ],
  documents: [
    { id: "doc1", name: "Blood Test Results", date: "2023-02-15", type: "pdf" },
    { id: "doc2", name: "Chest X-Ray", date: "2022-11-20", type: "image" },
    { id: "doc3", name: "ECG Report", date: "2022-08-05", type: "pdf" }
  ],
  currentConditions: [
    "Hypertension (mild)", "Seasonal Allergies"
  ],
  medications: [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", prescribed: "2023-01-10", doctor: "Dr. Emily Chen" },
    { name: "Cetirizine", dosage: "5mg", frequency: "As needed", prescribed: "2023-03-15", doctor: "Dr. Michael Lee" }
  ]
});

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!id) return;
    
    // Simulate loading data from server
    setLoading(true);
    setTimeout(() => {
      setPatientData(getMockPatientData(id));
      setLoading(false);
    }, 1500);
  }, [id]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-medical-gray">
        <div className="text-center">
          <FingerprintAnimation />
          <h2 className="text-xl font-semibold mt-6 text-gray-800">
            Loading Patient Records
          </h2>
          <p className="text-gray-600 mt-2">
            Securely retrieving medical information
          </p>
        </div>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-medical-gray">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Patient Not Found
          </h2>
          <p className="text-gray-600 mt-2">
            The requested patient record could not be located
          </p>
          <Button onClick={handleBack} className="mt-4">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-medical-gray">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Patient Records</h1>
            </div>
            <div>
              <Button onClick={handleBack}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Patient summary sidebar */}
          <div className="lg:col-span-1">
            <Card className="subtle-glass">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-medical-light flex items-center justify-center text-primary">
                    <User size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{patientData.name}</h2>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span>{patientData.age} years • {patientData.gender}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/70 rounded-lg p-3 border border-gray-100">
                      <div className="text-xs font-medium text-gray-500 mb-1">Blood Type</div>
                      <div className="flex items-center">
                        <Heart className="text-medical-danger h-4 w-4 mr-1" />
                        <span className="font-semibold">{patientData.bloodType}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/70 rounded-lg p-3 border border-gray-100">
                      <div className="text-xs font-medium text-gray-500 mb-1">Height</div>
                      <div className="flex items-center">
                        <Activity className="text-medical-accent h-4 w-4 mr-1" />
                        <span className="font-semibold">{patientData.height}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/70 rounded-lg p-3 border border-gray-100">
                      <div className="text-xs font-medium text-gray-500 mb-1">Weight</div>
                      <div className="flex items-center">
                        <Weight className="text-medical h-4 w-4 mr-1" />
                        <span className="font-semibold">{patientData.weight}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/70 rounded-lg p-3 border border-gray-100">
                      <div className="text-xs font-medium text-gray-500 mb-1">BMI</div>
                      <div className="flex items-center">
                        <Gauge className="text-medical-success h-4 w-4 mr-1" />
                        <span className="font-semibold">{patientData.bmi}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/70 rounded-lg p-3 border border-gray-100">
                    <div className="text-xs font-medium text-gray-500 mb-1">Aadhaar Number</div>
                    <div className="font-semibold text-gray-900">{patientData.aadhaarNumber}</div>
                  </div>
                  
                  <div className="bg-white/70 rounded-lg p-3 border border-gray-100">
                    <div className="text-xs font-medium text-gray-500 mb-1">Current Conditions</div>
                    <div className="space-y-1">
                      {patientData.currentConditions.length > 0 ? (
                        patientData.currentConditions.map((condition: string, index: number) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-medical-warning mr-2"></div>
                            <span className="text-sm">{condition}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500">No current conditions</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-white/70 rounded-lg p-3 border border-gray-100">
                    <div className="text-xs font-medium text-gray-500 mb-1">Diabetic Status</div>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${patientData.isDiabetic ? 'bg-medical-danger' : 'bg-medical-success'} mr-2`}></div>
                      <span className="font-semibold">
                        {patientData.isDiabetic ? 'Diabetic' : 'Non-Diabetic'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
                <TabsTrigger value="history" className="text-sm">Medical History</TabsTrigger>
                <TabsTrigger value="medications" className="text-sm">Medications</TabsTrigger>
                <TabsTrigger value="documents" className="text-sm">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 animate-fade-in">
                <Card className="subtle-glass">
                  <CardHeader>
                    <CardTitle className="text-lg">Vitals Overview</CardTitle>
                    <CardDescription>Tracking patient's vital statistics over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VitalsChart patientData={patientData} />
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="subtle-glass">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Activity className="mr-2 h-5 w-5 text-primary" />
                        Latest Readings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">Blood Pressure</div>
                          <div className="font-medium">
                            {patientData.vitals.bloodPressure.slice(-1)[0].systolic}/{patientData.vitals.bloodPressure.slice(-1)[0].diastolic} mmHg
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">Weight</div>
                          <div className="font-medium">{patientData.vitals.weight.slice(-1)[0].value} kg</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">Blood Sugar</div>
                          <div className="font-medium">{patientData.vitals.sugarLevels.slice(-1)[0].value} mg/dL</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">Oxygen Level</div>
                          <div className="font-medium">{patientData.vitals.oxygenLevels.slice(-1)[0].value}%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="subtle-glass">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Pill className="mr-2 h-5 w-5 text-primary" />
                        Current Medications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {patientData.medications.length > 0 ? (
                        <div className="space-y-3">
                          {patientData.medications.map((med: any, index: number) => (
                            <div key={index} className="flex items-start">
                              <div className="w-2 h-2 rounded-full bg-medical mt-1.5 mr-2"></div>
                              <div>
                                <div className="font-medium">{med.name} {med.dosage}</div>
                                <div className="text-sm text-gray-500">{med.frequency}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          <Pill className="mx-auto h-8 w-8 opacity-20 mb-2" />
                          <p>No active medications</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4 animate-fade-in">
                <Card className="subtle-glass">
                  <CardHeader>
                    <CardTitle className="text-lg">Medical History</CardTitle>
                    <CardDescription>Previous hospital visits and medical conditions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {patientData.medicalHistory.length > 0 ? (
                      <div className="space-y-4">
                        {patientData.medicalHistory.map((entry: any, index: number) => (
                          <div key={index} className="bg-white/70 rounded-lg p-4 border border-gray-100">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-gray-900">{entry.condition}</div>
                                <div className="text-sm text-gray-500">{entry.hospital}</div>
                              </div>
                              <div className="text-sm text-gray-500">{entry.date}</div>
                            </div>
                            <div className="mt-2 text-sm text-gray-700">
                              <span className="font-medium">Attending Physician:</span> {entry.doctor}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-gray-500">
                        <FileText className="mx-auto h-12 w-12 opacity-20 mb-3" />
                        <p>No medical history records available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="medications" className="animate-fade-in">
                <MedicationHistory patientData={patientData} />
              </TabsContent>
              
              <TabsContent value="documents" className="animate-fade-in">
                <UploadDocuments patientData={patientData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDetails;
