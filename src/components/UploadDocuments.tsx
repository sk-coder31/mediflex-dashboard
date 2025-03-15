
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
import { 
  FileText, 
  Image, 
  Upload, 
  Download, 
  Eye, 
  Calendar, 
  X 
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface UploadDocumentsProps {
  patientData: any;
}

interface Document {
  id: string;
  name: string;
  date: string;
  type: string;
  url?: string;
  file?: File;
}

const UploadDocuments = ({ patientData }: UploadDocumentsProps) => {
  const [documents, setDocuments] = useState<Document[]>(patientData.documents || []);
  const [viewDocument, setViewDocument] = useState<Document | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newDocName, setNewDocName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Auto-fill document name if empty
      if (!newDocName) {
        setNewDocName(file.name.split('.')[0]);
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !newDocName) {
      toast.error("Please select a file and provide a name");
      return;
    }

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const fileType = selectedFile.type.includes('image') ? 'image' : 'pdf';
      
      const newDocument: Document = {
        id: `doc${documents.length + 1}`,
        name: newDocName,
        date: new Date().toISOString().split('T')[0],
        type: fileType,
        file: selectedFile
      };
      
      setDocuments([...documents, newDocument]);
      setIsUploading(false);
      setSelectedFile(null);
      setNewDocName("");
      toast.success("Document uploaded successfully");
    }, 1500);
  };

  const handleViewDocument = (doc: Document) => {
    setViewDocument(doc);
  };

  const renderDocumentIcon = (type: string) => {
    if (type === 'image') {
      return <Image className="h-5 w-5 text-medical-accent" />;
    }
    return <FileText className="h-5 w-5 text-primary" />;
  };

  return (
    <Card className="subtle-glass">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <FileText className="mr-2 h-5 w-5 text-primary" />
          Medical Documents
        </CardTitle>
        <CardDescription>
          View and manage patient's medical documents and scans
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <Card 
              key={doc.id}
              className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
            >
              <div className="p-4 pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    {renderDocumentIcon(doc.type)}
                    <h3 className="ml-2 font-medium text-gray-900 truncate max-w-[150px]">
                      {doc.name}
                    </h3>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {doc.date}
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4 pt-1">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 h-8 text-xs"
                    onClick={() => handleViewDocument(doc)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 h-8 text-xs"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          {/* Upload card */}
          <Card className="overflow-hidden shadow-sm border-dashed border-2 bg-white/50">
            <div className="p-4 h-full flex flex-col items-center justify-center text-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <h3 className="font-medium text-gray-700">Upload Document</h3>
              <p className="text-xs text-gray-500 mt-1 mb-3">
                Add new medical records
              </p>
              
              <div className="mt-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="h-8 text-xs">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Medical Document</DialogTitle>
                      <DialogDescription>
                        Upload medical records, scans, or X-rays for this patient.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Document Name
                        </label>
                        <Input
                          placeholder="Enter document name"
                          value={newDocName}
                          onChange={(e) => setNewDocName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Select File
                        </label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center">
                          <Input
                            type="file"
                            className="hidden"
                            id="file-upload"
                            accept=".pdf,image/*"
                            onChange={handleFileChange}
                          />
                          <label 
                            htmlFor="file-upload"
                            className="cursor-pointer flex flex-col items-center justify-center"
                          >
                            {selectedFile ? (
                              <div className="text-sm">
                                <p className="font-medium text-primary">{selectedFile.name}</p>
                                <p className="text-gray-500 text-xs mt-1">
                                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            ) : (
                              <>
                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">
                                  Click to select a file or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  PDF, JPG, PNG (max. 10MB)
                                </p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleUpload}
                        disabled={isUploading || !selectedFile}
                      >
                        {isUploading ? (
                          <>Uploading...</>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-1" />
                            Upload Document
                          </>
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        </div>
      </CardContent>
      
      {/* View document dialog */}
      <Dialog open={!!viewDocument} onOpenChange={(open) => !open && setViewDocument(null)}>
        <DialogContent className="max-w-3xl w-full">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{viewDocument?.name}</DialogTitle>
              <Button 
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => setViewDocument(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              Uploaded on {viewDocument?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 h-[60vh] flex items-center justify-center bg-gray-100 rounded-lg">
            {viewDocument?.type === 'image' ? (
              <div className="text-center">
                <Image className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Image preview would be shown here</p>
                <p className="text-sm text-gray-400 mt-1">
                  (Actual image display requires backend integration)
                </p>
              </div>
            ) : (
              <div className="text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">PDF preview would be shown here</p>
                <p className="text-sm text-gray-400 mt-1">
                  (Actual PDF display requires backend integration)
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button 
              variant="ghost"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              Delete Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const Plus = ({ className }: { className?: string }) => {
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
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
};

export default UploadDocuments;
