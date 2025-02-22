
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClipboardList, Plus } from "lucide-react";
import { getMockDatabase } from "./PlateRegistration";
import { PlateRegistration } from "./PlateRegistration";
import { useToast } from "@/hooks/use-toast";

export const PlatesManagementDialog = () => {
  const residents = getMockDatabase();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const { toast } = useToast();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <ClipboardList className="w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Placas Cadastradas</span>
            <button
              onClick={() => setShowRegistrationForm(true)}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Cadastrar Nova Placa
            </button>
          </DialogTitle>
        </DialogHeader>
        {showRegistrationForm ? (
          <PlateRegistration
            currentPlate=""
            onRegistration={(data) => {
              setShowRegistrationForm(false);
              toast({
                title: "Placa cadastrada com sucesso!",
                description: `Morador: ${data.name} - Apartamento: ${data.apartment}`,
              });
            }}
          />
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Placa
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Morador
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Apartamento
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {residents.map((resident) => (
                    <tr key={resident.plate}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {resident.plate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resident.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resident.apartment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

