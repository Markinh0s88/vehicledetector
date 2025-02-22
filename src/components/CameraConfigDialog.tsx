
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";

export interface CameraConfig {
  ipAddress: string;
  username: string;
  password: string;
  port: string;
}

export const CameraConfigDialog = () => {
  const [config, setConfig] = useState<CameraConfig>({
    ipAddress: "",
    username: "",
    password: "",
    port: "554",
  });

  const handleSave = () => {
    localStorage.setItem("cameraConfig", JSON.stringify(config));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings className="w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurações da Câmera IP</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium">Endereço IP</label>
            <input
              type="text"
              value={config.ipAddress}
              onChange={(e) =>
                setConfig({ ...config, ipAddress: e.target.value })
              }
              className="w-full p-2 border rounded mt-1"
              placeholder="192.168.1.100"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Usuário</label>
            <input
              type="text"
              value={config.username}
              onChange={(e) =>
                setConfig({ ...config, username: e.target.value })
              }
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Senha</label>
            <input
              type="password"
              value={config.password}
              onChange={(e) =>
                setConfig({ ...config, password: e.target.value })
              }
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Porta RTSP</label>
            <input
              type="text"
              value={config.port}
              onChange={(e) => setConfig({ ...config, port: e.target.value })}
              className="w-full p-2 border rounded mt-1"
              placeholder="554"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Salvar Configurações
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
