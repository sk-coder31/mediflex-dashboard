
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend
} from "recharts";

interface VitalsChartProps {
  patientData: any;
}

const VitalsChart = ({ patientData }: VitalsChartProps) => {
  const [activeChart, setActiveChart] = useState("bloodPressure");

  const renderBloodPressureChart = () => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={patientData.vitals.bloodPressure}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#888" fontSize={12} />
          <YAxis stroke="#888" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "white", 
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              border: "none"
            }} 
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="systolic"
            stroke="#2196F3"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, stroke: "#2196F3", strokeWidth: 2, fill: "white" }}
            name="Systolic"
          />
          <Line
            type="monotone"
            dataKey="diastolic"
            stroke="#03A9F4"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, stroke: "#03A9F4", strokeWidth: 2, fill: "white" }}
            name="Diastolic"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderWeightChart = () => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={patientData.vitals.weight}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#888" fontSize={12} />
          <YAxis stroke="#888" fontSize={12} domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "white", 
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              border: "none"
            }} 
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4CAF50"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, stroke: "#4CAF50", strokeWidth: 2, fill: "white" }}
            name="Weight (kg)"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderSugarLevelsChart = () => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={patientData.vitals.sugarLevels}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#888" fontSize={12} />
          <YAxis stroke="#888" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "white", 
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              border: "none"
            }} 
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#FFC107"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, stroke: "#FFC107", strokeWidth: 2, fill: "white" }}
            name="Blood Sugar (mg/dL)"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderOxygenLevelsChart = () => {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={patientData.vitals.oxygenLevels}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#888" fontSize={12} />
          <YAxis stroke="#888" fontSize={12} domain={[90, 100]} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "white", 
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              border: "none"
            }} 
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#F44336"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, stroke: "#F44336", strokeWidth: 2, fill: "white" }}
            name="Oxygen Level (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Tabs value={activeChart} onValueChange={setActiveChart} className="w-full">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="bloodPressure" className="text-xs">Blood Pressure</TabsTrigger>
        <TabsTrigger value="weight" className="text-xs">Weight</TabsTrigger>
        <TabsTrigger value="sugarLevels" className="text-xs">Blood Sugar</TabsTrigger>
        <TabsTrigger value="oxygenLevels" className="text-xs">Oxygen Levels</TabsTrigger>
      </TabsList>
      
      <TabsContent value="bloodPressure" className="animate-fade-in">
        {renderBloodPressureChart()}
      </TabsContent>
      
      <TabsContent value="weight" className="animate-fade-in">
        {renderWeightChart()}
      </TabsContent>
      
      <TabsContent value="sugarLevels" className="animate-fade-in">
        {renderSugarLevelsChart()}
      </TabsContent>
      
      <TabsContent value="oxygenLevels" className="animate-fade-in">
        {renderOxygenLevelsChart()}
      </TabsContent>
    </Tabs>
  );
};

export default VitalsChart;
