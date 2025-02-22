
import React, { useState } from "react";
import { CameraFeed } from "@/components/CameraFeed";
import { PlateRecognition } from "@/components/PlateRecognition";
import { RecentAccess } from "@/components/RecentAccess";
import { PlateRegistration } from "@/components/PlateRegistration";

const Index = () => {
  const [currentPlate] = useState("ABC1234");
  const [isResident] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold">Controle de Acesso de Veículos</h1>
          <p className="text-gray-500 mt-2">Sistema de Reconhecimento de Placas</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CameraFeed />
            <PlateRecognition plate={currentPlate} isResident={isResident} />
            <PlateRegistration 
              currentPlate={currentPlate}
              onRegistration={(data) => {
                console.log("Novo registro:", data);
              }}
            />
          </div>
          <div>
            <RecentAccess />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
