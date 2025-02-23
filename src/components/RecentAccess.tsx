
import React, { useState } from "react";
import { List, Search, Car, UserCheck, AlertCircle } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterResident, setFilterResident] = useState<boolean | null>(null);

  const filteredData = mockData.filter((record) => {
    const matchesSearch = record.plate.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterResident === null || record.isResident === filterResident;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="glass dark:glass-dark p-6 rounded-lg space-y-4 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <List className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Acessos Recentes</h2>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar placas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
            />
          </div>
          <select
            value={filterResident === null ? "all" : filterResident ? "resident" : "visitor"}
            onChange={(e) => {
              const value = e.target.value;
              setFilterResident(value === "all" ? null : value === "resident");
            }}
            className="px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
          >
            <option value="all">Todos</option>
            <option value="resident">Residentes</option>
            <option value="visitor">Visitantes</option>
          </select>
        </div>
        <div className="space-y-2">
          {filteredData.map((record, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors animate-fade-in"
            >
              <div className="flex items-center space-x-3">
                <Car className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">{record.plate}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{record.timestamp}</p>
                </div>
              </div>
              <span
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                  record.isResident
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                    : "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300"
                }`}
              >
                {record.isResident ? (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Residente</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>Visitante</span>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
