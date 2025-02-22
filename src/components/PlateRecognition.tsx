
import React from "react";
import { Check, X } from "lucide-react";

interface PlateRecognitionProps {
  plate?: string;
  isResident?: boolean;
}

export const PlateRecognition = ({ plate, isResident }: PlateRecognitionProps) => {
  return (
    <div className="glass p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-semibold">Reconhecimento de Placa</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Placa Atual</p>
          <p className="text-3xl font-bold tracking-wider">
            {plate || "Nenhuma placa detectada"}
          </p>
        </div>
        {plate && (
          <div className="flex items-center space-x-2">
            {isResident ? (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                <Check className="w-5 h-5" />
                <span>Residente</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full">
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
