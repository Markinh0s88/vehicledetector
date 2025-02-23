
import React from "react";
import { Check, X, User, Car } from "lucide-react";
import { findResident } from "./PlateRegistration";

interface PlateRecognitionProps {
  plate?: string;
  isResident?: boolean;
  onPlateDetected?: (isResident: boolean) => void;
}

export const PlateRecognition = ({ 
  plate, 
  isResident,
  onPlateDetected 
}: PlateRecognitionProps) => {
  const residentInfo = plate ? findResident(plate) : undefined;

  React.useEffect(() => {
    if (plate && onPlateDetected) {
      onPlateDetected(!!isResident);
    }
  }, [plate, isResident, onPlateDetected]);

  return (
    <div className="glass dark:glass-dark p-6 rounded-lg space-y-4 transition-colors duration-200">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Car className="w-6 h-6" />
        Reconhecimento de Placa
      </h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Placa Atual</p>
          <p className="text-3xl font-bold tracking-wider">
            {plate || "Nenhuma placa detectada"}
          </p>
          {residentInfo && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>
                  Morador: {residentInfo.name} - Ap: {residentInfo.apartment}
                </span>
              </div>
            </div>
          )}
        </div>
        {plate && (
          <div className="flex items-center space-x-2">
            {isResident ? (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full animate-fade-in">
                <Check className="w-5 h-5" />
                <span>Residente</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full animate-fade-in">
                <X className="w-5 h-5" />
                <span>Visitante</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
