import { ChevronUp, Wifi } from "lucide-react";
import { useState, useEffect } from "react";

interface MowerBotProps {
  direction?: "f" | "b" | "l" | "r";
  cutterOn?: boolean;
  isAutoMode?: boolean;
  isFrontBlocked: boolean;
  isRearBlocked: boolean;
}

export default function MowerBot({
  direction,
  cutterOn,
  isAutoMode,
  isFrontBlocked,
  isRearBlocked,
}: MowerBotProps) {
  const [rotation, setRotation] = useState(20);

  const mower_direction =
    direction === "f"
      ? "animate-pulse scale-108"
      : direction === "b"
        ? "rotate-180"
        : direction === "l"
          ? "-rotate-90"
          : direction === "r"
            ? "rotate-90"
            : "";

  const cutter_status = cutterOn ? rotation : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 8) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className={`relative ${mower_direction} transition-all duration-500 ease-in-out`}
      >
        {isFrontBlocked && (
          <div className="absolute bottom-30 w-full z-10 flex items-center justify-center">
            <Wifi className="animate-ping text-red-500 scale-125" />
          </div>
        )}

        {/* Main body */}
        <div className="relative w-32 h-32 rounded-full bg-linear-to-b from-green-600 to-green-700 flex items-center justify-center shadow-2xl">
          {/* Rubber bumper edge */}
          <div className="absolute inset-0 rounded-full border-4 border-green-900" />

          {/* Control panel */}
          <div className="absolute top-6 w-10 h-5 rounded bg-gray-800 border border-gray-900 flex items-center justify-center gap-1">
            <div
              className={`w-1.5 h-1.5 rounded-full ${isAutoMode ? "bg-blue-500 animate-ping" : "bg-red-600 border-red-800"}`}
            />
            <div
              className={`w-1.5 h-1.5 rounded-full ${isAutoMode ? "bg-green-500 animate-caret-blink" : "bg-yellow-200 border-yellow-300"}`}
            />
          </div>

          {/* Direction indicator */}
          <ChevronUp
            size={24}
            className="text-white opacity-90 absolute top-0"
          />

          {/* Spinning blade housing (underneath) */}
          <div className="absolute bottom-1 w-20 h-20 rounded-full bg-gray-800 shadow-lg border-2 border-gray-900 flex items-center justify-center overflow-hidden">
            {/* Spinning blades */}
            <div
              className="absolute w-16 h-0.5 bg-green-600"
              style={{ transform: `rotate(${cutter_status}deg)` }}
            />
            <div
              className="absolute w-16 h-0.5 bg-green-600"
              style={{ transform: `rotate(${cutter_status + 90}deg)` }}
            />
            {/* Center bolt */}
            <div className="absolute w-3 h-3 rounded-full bg-gray-600 border border-gray-500 z-10" />
          </div>
        </div>

        {/* Left wheel */}
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-14 rounded-lg bg-gray-900 border-2 border-gray-700">
          <div className="w-full h-0.5 bg-gray-600 mt-1.5" />
          <div className="w-full h-0.5 bg-gray-600 mt-2.5" />
          <div className="w-full h-0.5 bg-gray-600 mt-2.5" />
          <div className="w-full h-0.5 bg-gray-600 mt-2.5" />
        </div>

        {/* Right wheel */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-14 rounded-lg bg-gray-900 border-2 border-gray-700">
          <div className="w-full h-0.5 bg-gray-600 mt-1.5" />
          <div className="w-full h-0.5 bg-gray-600 mt-2.5" />
          <div className="w-full h-0.5 bg-gray-600 mt-2.5" />
          <div className="w-full h-0.5 bg-gray-600 mt-2.5" />
        </div>

        {isRearBlocked && (
          <div className="absolute -bottom-2 w-full flex items-center justify-center">
            <Wifi className="animate-ping text-red-600 scale-125 rotate-180" />
          </div>
        )}
      </div>
    </>
  );
}
