
import React from "react";
import { Camera } from "lucide-react";

export const CameraFeed = () => {
  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <Camera className="w-16 h-16 text-gray-400" />
        <p className="absolute mt-20 text-gray-500">Camera Feed Unavailable</p>
      </div>
    </div>
  );
};
