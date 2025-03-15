
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pill, Plus, Calendar, User, Clock } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface MedicationHistoryProps {
  patientData: any;
}

const MedicationHistory = ({ patientData }: MedicationHistoryProps) => {
  const [medications, setMedications] = useState<any[]>(patientData.medications || []);
  const [newMed, setNewMed] = useState({
    name: "",
    dosage: "",
    frequency: "",
    prescribed: new Date().toISOString().split('T')[0],
    doctor: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setNewMed(prev => ({ ...prev, [field]: value }));
  };

  const handleAddMedication = () => {
    // Basic validation
    if (!newMed.name || !newMed.dosage || !newMed.frequency || !newMed.doctor) {
      toast.error("Please fill all required fields");
      return;
    }

    const updatedMedications = [...medications, newMed];
    setMedications(updatedMedications);
    
    // Reset form
    setNewMed({
      name: "",
      dosage: "",
      frequency: "",
      prescribed: new Date().toISOString().split('T')[0],
      doctor: ""
    });
    
    setIsDialogOpen(false);
    toast.success("Medication added successfully");
  };

  return (
    <Card className="subtle-glass">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Pill className="mr-2 h-5 w-5 text-primary" />
              Medication History
            </CardTitle>
            <CardDescription>
              Track and manage patient's medication
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center">
                <Plus className="mr-1 h-4 w-4" />
                Add Medication
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Medication</DialogTitle>
                <DialogDescription>
                  Enter the details of the medication to add to the patient's record.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-sm font-medium">
                    Medication
                  </label>
                  <Input
                    id="name"
                    placeholder="Medication name"
                    className="col-span-3"
                    value={newMed.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="dosage" className="text-right text-sm font-medium">
                    Dosage
                  </label>
                  <Input
                    id="dosage"
                    placeholder="e.g., 10mg"
                    className="col-span-3"
                    value={newMed.dosage}
                    onChange={(e) => handleInputChange("dosage", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="frequency" className="text-right text-sm font-medium">
                    Frequency
                  </label>
                  <Input
                    id="frequency"
                    placeholder="e.g., Once daily"
                    className="col-span-3"
                    value={newMed.frequency}
                    onChange={(e) => handleInputChange("frequency", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="prescribed" className="text-right text-sm font-medium">
                    Date
                  </label>
                  <Input
                    id="prescribed"
                    type="date"
                    className="col-span-3"
                    value={newMed.prescribed}
                    onChange={(e) => handleInputChange("prescribed", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="doctor" className="text-right text-sm font-medium">
                    Doctor
                  </label>
                  <Input
                    id="doctor"
                    placeholder="Prescribing doctor"
                    className="col-span-3"
                    value={newMed.doctor}
                    onChange={(e) => handleInputChange("doctor", e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMedication}>Add Medication</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Medication</th>
                <th scope="col" className="px-6 py-3">Dosage</th>
                <th scope="col" className="px-6 py-3">Frequency</th>
                <th scope="col" className="px-6 py-3">Prescribed</th>
                <th scope="col" className="px-6 py-3">Doctor</th>
              </tr>
            </thead>
            <tbody>
              {medications.length > 0 ? (
                medications.map((med, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{med.name}</td>
                    <td className="px-6 py-4">{med.dosage}</td>
                    <td className="px-6 py-4">{med.frequency}</td>
                    <td className="px-6 py-4">{med.prescribed}</td>
                    <td className="px-6 py-4">{med.doctor}</td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white">
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No medications have been prescribed to this patient
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
      {medications.length > 0 && (
        <CardFooter>
          <p className="text-sm text-gray-500">
            Showing {medications.length} medication records
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default MedicationHistory;
