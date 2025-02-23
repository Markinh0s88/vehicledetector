
import React, { useState, useEffect } from "react";
import { CameraFeed } from "@/components/CameraFeed";
import { PlateRecognition } from "@/components/PlateRecognition";
import { RecentAccess } from "@/components/RecentAccess";
import { PlateRegistration } from "@/components/PlateRegistration";
import { CameraConfigDialog } from "@/components/CameraConfigDialog";
import { PlatesManagementDialog } from "@/components/PlatesManagementDialog";
import { useToast } from "@/hooks/use-toast";
import { Sun, Moon } from "lucide-react";
import useSound from "use-sound";
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  // Som para placa detectada (residente)
  const [playResidentSound] = useSound('/sounds/resident.mp3', { volume: 0.5 });
  // Som para placa detectada (visitante)
  const [playVisitorSound] = useSound('/sounds/visitor.mp3', { volume: 0.5 });
  // Som para registro bem sucedido
  const [playSuccessSound] = useSound('/sounds/success.mp3', { volume: 0.5 });

  useEffect(() => {
    // Simula a detecção de uma nova placa
    const timer = setTimeout(() => {
      const newPlate = "XYZ9876";
      setCurrentPlate(newPlate);
      setIsResident(false);
      playVisitorSound();
      toast({
        title: "Nova Placa Detectada",
        description: `A placa ${newPlate} foi detectada. Deseja cadastrá-la?`,
        action: (
          <button
            onClick={() => setShowRegisterDialog(true)}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Cadastrar
          </button>
        ),
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Aplica o tema escuro ao body
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? "dark bg-gray-900 text-white" : "bg-gradient-to-br from-gray-50 to-gray-100"
    } p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center mb-12 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Controle de Acesso de Veículos</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <CameraConfigDialog />
            <PlatesManagementDialog />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CameraFeed />
            <PlateRecognition 
              plate={currentPlate} 
              isResident={isResident}
              onPlateDetected={(isResident) => {
                if (isResident) {
                  playResidentSound();
                } else {
                  playVisitorSound();
                }
              }}
            />
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
                    playSuccessSound();
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
