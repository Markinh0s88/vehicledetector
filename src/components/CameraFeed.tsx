
import React, { useState } from "react";
import { Camera, ZoomIn, ZoomOut } from "lucide-react";

export const CameraFeed = () => {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 1));
  };

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 transition-colors duration-200">
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `scale(${zoom})` }}>
        <Camera className="w-16 h-16 text-gray-400" />
        <p className="absolute mt-20 text-gray-500 dark:text-gray-400">Câmera Indisponível</p>
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors"
          title="Diminuir Zoom"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors"
          title="Aumentar Zoom"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
