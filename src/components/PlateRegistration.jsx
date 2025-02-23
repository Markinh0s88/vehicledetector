
import React, { useState } from "react";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockDatabase = [
  {
    name: "João Silva",
    apartment: "101",
    plate: "ABC1234",
  },
];

export const PlateRegistration = ({ currentPlate, onRegistration }) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [apartment, setApartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newResident = {
      name,
      apartment,
      plate: currentPlate,
    };
    
    try {
      // Usando a API do Electron para salvar no SQLite
      await window.electron.invoke('add-resident', newResident);
      mockDatabase.push(newResident);
      onRegistration(newResident);
      
      toast({
        title: "Placa cadastrada com sucesso!",
        description: `Morador: ${name} - Apartamento: ${apartment}`,
      });
      
      setName("");
      setApartment("");
    } catch (error) {
      toast({
        title: "Erro ao cadastrar placa",
        description: "Ocorreu um erro ao salvar os dados.",
        variant: "destructive",
      });
    }
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

export const findResident = (plate) => {
  return mockDatabase.find((resident) => resident.plate === plate);
};

export const getMockDatabase = () => mockDatabase;

