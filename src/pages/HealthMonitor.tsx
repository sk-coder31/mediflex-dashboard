
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Activity } from "lucide-react";
import { toast } from "sonner";

// Define health metrics interface
interface HealthMetrics {
  weight: string;
  bodyFat: string;
  bmi: string;
  visceralFat: string;
  metabolicAge: string;
  hydration: string;
  bmr: string;
  proteinPercentage: string;
  boneMass: string;
  muscleMass: string;
  subcutaneousFat: string;
  skeletalMass: string;
}

const HealthMonitor = () => {
  const navigate = useNavigate();
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    weight: "",
    bodyFat: "",
    bmi: "",
    visceralFat: "",
    metabolicAge: "",
    hydration: "",
    bmr: "",
    proteinPercentage: "",
    boneMass: "",
    muscleMass: "",
    subcutaneousFat: "",
    skeletalMass: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHealthMetrics((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would send this data to a server
    // For now, we'll just show a success toast and navigate back
    
    // Store the health metrics in localStorage for demo purposes
    localStorage.setItem("healthMetrics", JSON.stringify(healthMetrics));
    
    toast.success("Health metrics saved successfully");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-medical-gray">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate("/dashboard")}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Health Monitoring</h1>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
        <div className="grid grid-cols-1 gap-6">
          <Card className="subtle-glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-primary" />
                IOT Weight Scale & Sugar Level Monitor
              </CardTitle>
              <CardDescription>
                Enter your health metrics from connected IOT devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input 
                      id="weight"
                      name="weight"
                      placeholder="Enter weight"
                      value={healthMetrics.weight}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bodyFat">Body Fat %</Label>
                    <Input 
                      id="bodyFat"
                      name="bodyFat"
                      placeholder="Enter body fat percentage"
                      value={healthMetrics.bodyFat}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bmi">BMI</Label>
                    <Input 
                      id="bmi"
                      name="bmi"
                      placeholder="Enter BMI"
                      value={healthMetrics.bmi}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="visceralFat">Visceral Fat</Label>
                    <Input 
                      id="visceralFat"
                      name="visceralFat"
                      placeholder="Enter visceral fat"
                      value={healthMetrics.visceralFat}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="metabolicAge">Metabolic Age</Label>
                    <Input 
                      id="metabolicAge"
                      name="metabolicAge"
                      placeholder="Enter metabolic age"
                      value={healthMetrics.metabolicAge}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hydration">Hydration %</Label>
                    <Input 
                      id="hydration"
                      name="hydration"
                      placeholder="Enter hydration percentage"
                      value={healthMetrics.hydration}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bmr">BMR (Basal Metabolic Rate)</Label>
                    <Input 
                      id="bmr"
                      name="bmr"
                      placeholder="Enter BMR"
                      value={healthMetrics.bmr}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="proteinPercentage">Protein %</Label>
                    <Input 
                      id="proteinPercentage"
                      name="proteinPercentage"
                      placeholder="Enter protein percentage"
                      value={healthMetrics.proteinPercentage}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="boneMass">Bone Mass</Label>
                    <Input 
                      id="boneMass"
                      name="boneMass"
                      placeholder="Enter bone mass"
                      value={healthMetrics.boneMass}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="muscleMass">Muscle Mass</Label>
                    <Input 
                      id="muscleMass"
                      name="muscleMass"
                      placeholder="Enter muscle mass"
                      value={healthMetrics.muscleMass}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subcutaneousFat">Subcutaneous Fat</Label>
                    <Input 
                      id="subcutaneousFat"
                      name="subcutaneousFat"
                      placeholder="Enter subcutaneous fat"
                      value={healthMetrics.subcutaneousFat}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="skeletalMass">Skeletal Mass</Label>
                    <Input 
                      id="skeletalMass"
                      name="skeletalMass"
                      placeholder="Enter skeletal mass"
                      value={healthMetrics.skeletalMass}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="flex items-center">
                    <Save className="mr-2 h-4 w-4" />
                    Save Health Metrics
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HealthMonitor;
