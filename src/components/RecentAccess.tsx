
import React from "react";
import { List, Search } from "lucide-react";

interface AccessRecord {
  plate: string;
  timestamp: string;
  isResident: boolean;
}

const mockData: AccessRecord[] = [
  {
    plate: "ABC1234",
    timestamp: "20/03/2024 14:30",
    isResident: true,
  },
  {
    plate: "XYZ5678",
    timestamp: "20/03/2024 14:25",
    isResident: false,
  },
  {
    plate: "DEF9012",
    timestamp: "20/03/2024 14:20",
    isResident: true,
  },
];

export const RecentAccess = () => {
  return (
    <div className="glass p-6 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <List className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Acessos Recentes</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar placas..."
            className="pl-10 pr-4 py-2 rounded-full bg-white/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <div className="space-y-2">
        {mockData.map((record, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
          >
            <div>
              <p className="font-medium">{record.plate}</p>
              <p className="text-sm text-gray-500">{record.timestamp}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                record.isResident
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {record.isResident ? "Residente" : "Visitante"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
