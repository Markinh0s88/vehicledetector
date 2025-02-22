
import React, { useState, useEffect } from "react";
import { CameraFeed } from "@/components/CameraFeed";
import { PlateRecognition } from "@/components/PlateRecognition";
import { RecentAccess } from "@/components/RecentAccess";
import { PlateRegistration } from "@/components/PlateRegistration";
import { CameraConfigDialog } from "@/components/CameraConfigDialog";
import { PlatesManagementDialog } from "@/components/PlatesManagementDialog";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Index = () => {
  const [currentPlate, setCurrentPlate] = useState("ABC1234");
  const [isResident, setIsResident] = useState(true);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simula a detecção de uma nova placa
    const timer = setTimeout(() => {
      const newPlate = "XYZ9876";
      setCurrentPlate(newPlate);
      setIsResident(false);
      toast({
        title: "Nova Placa Detectada",
        description: `A placa ${newPlate} foi detectada. Deseja cadastrá-la?`,
        action: (
          <button
            onClick={() => setShowRegisterDialog(true)}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Cadastrar
          </button>
        ),
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center mb-12 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Controle de Acesso de Veículos</h1>
          <div className="flex items-center space-x-2">
            <CameraConfigDialog />
            <PlatesManagementDialog />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CameraFeed />
            <PlateRecognition plate={currentPlate} isResident={isResident} />
            <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Nova Placa</DialogTitle>
                </DialogHeader>
                <PlateRegistration
                  currentPlate={currentPlate}
                  onRegistration={(data) => {
                    console.log("Novo registro:", data);
                    setShowRegisterDialog(false);
                    setIsResident(true);
                    toast({
                      title: "Placa Cadastrada",
                      description: "A placa foi cadastrada com sucesso!",
                    });
                  }}
                />
              </DialogContent>
            </Dialog>
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
