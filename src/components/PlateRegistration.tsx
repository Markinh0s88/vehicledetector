
import React, { useState } from "react";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResidentData {
  name: string;
  apartment: string;
  plate: string;
}

// Simulando um banco de dados local por enquanto
const mockDatabase: ResidentData[] = [
  {
    name: "João Silva",
    apartment: "101",
    plate: "ABC1234",
  },
];

export const PlateRegistration = ({
  currentPlate,
  onRegistration,
}: {
  currentPlate: string;
  onRegistration: (data: ResidentData) => void;
}) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [apartment, setApartment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newResident: ResidentData = {
      name,
      apartment,
      plate: currentPlate,
    };
    
    mockDatabase.push(newResident);
    onRegistration(newResident);
    
    toast({
      title: "Placa cadastrada com sucesso!",
      description: `Morador: ${name} - Apartamento: ${apartment}`,
    });
    
    setName("");
    setApartment("");
  };

  return (
    <div className="glass p-6 rounded-lg space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Save className="w-5 h-5" />
        Cadastrar Placa
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Morador
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número do Apartamento
          </label>
          <input
            type="text"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

// Exportando a função para verificar residentes e o mock do banco de dados
export const findResident = (plate: string): ResidentData | undefined => {
  return mockDatabase.find((resident) => resident.plate === plate);
};

export const getMockDatabase = () => mockDatabase;
