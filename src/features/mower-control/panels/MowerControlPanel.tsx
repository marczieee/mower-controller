import { useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Fan,
  CircleArrowUp,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useSensorMonitoring } from "@/features/mower-control/hooks/useSensorMonitoring";
import { set } from "firebase/database";

import MowerBot from "@/components/custom/objects/MowerBot";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MowerControlPanel = () => {
  const navigate = useNavigate();

  const [isCutterOn, setIsCutterOn] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(false);

  const {
    controlRef,
    cutterRef,
    autoModeRef,
    control,
    sonar1,
    sonar2,
    isConnected,
  } = useSensorMonitoring();

  const handleDirectionPress = (direction: string) => {
    console.log(`Direction: ${direction}`);
    set(controlRef, direction);
  };

  const handleCutterToggle = (state: boolean) => {
    setIsCutterOn(state);
    set(cutterRef, state ? 1 : 0);
  };

  const handleAutoModeToggle = (state: boolean) => {
    setIsAutoMode(state);
    setIsCutterOn(state);
    set(autoModeRef, state ? 1 : 0);
    set(cutterRef, state ? 1 : 0);
  };

  // const handlePowerSwitchToggle = (state: boolean) => {
  //   setIsPowerOn(state);
  //   set(powerSwitchRef, state ? 1 : 0);
  // };

  const isFrontBlocked = sonar1! <= 12;
  const isRearBlocked = sonar2! <= 12;

  return (
    <div>
      {/* Main Controller Container */}
      <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-2xl border border-slate-700/50 h-screen w-screen">
        {/* Glowing accent */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
        <div className="flex items-start gap-2">
          {/* Header */}
          <div className="text-start mb-8">
            <div className="flex items-center gap-2">
              <div
                onClick={() => navigate("/")}
                className="from-slate-700 to-slate-800 border border-slate-600/50 p-1 rounded-lg active:scale-110"
              >
                <ArrowLeft className="text-white/70" />
              </div>
              <span className="text-sm font-bold bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                iCUT
              </span>
            </div>
            <p className="text-slate-400 text-[10px] mt-1">
              Automated Battery-Powered Grasscutter <br /> with Mobile
              Monitoring
            </p>
          </div>

          <div className="flex items-center justify-center w-62 portrait:mt-16">
            <MowerBot
              direction={control as "f" | "b" | "l" | "r" | undefined}
              cutterOn={isCutterOn}
              isAutoMode={isAutoMode}
              isFrontBlocked={isFrontBlocked}
              isRearBlocked={isRearBlocked}
            />
          </div>

          <div className="">
            <div className="w-fit flex-col gap-2 text-white portrait:hidden">
              <div className="flex items-center gap-2 rounded-full">
                {isConnected ? (
                  <>
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                    </span>
                    <Wifi className="h-4 w-4 text-green-500" />
                    <span className="text-xs font-medium text-green-500">
                      Connected
                    </span>
                  </>
                ) : (
                  <>
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <WifiOff className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-700">
                      Not Connected
                    </span>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-0">
                <div>
                  <span className="text-green-400 text-[10px] font-semibold animate-pulse">
                    Front Sensing:
                  </span>
                  <span className="text-xs"> {sonar1} cm</span>
                </div>
                <div>
                  <span className="text-orange-400 text-[10px] font-semibold animate-pulse">
                    Rear Sensing:
                  </span>
                  <span className="text-xs"> {sonar2} cm</span>
                </div>
              </div>
            </div>
            {/* <div className="">
              <button
                onClick={() => handlePowerSwitchToggle(!isPowerOn)}
                className={`group w-fit relative flex items-center gap-4 p-2 rounded-2xl border transition-all duration-500 ${
                  isPowerOn
                    ? "bg-linear-to-br from-red-600/30 to-red-800/30 border-red-500/50 shadow-lg shadow-red-500/20"
                    : "bg-linear-to-br from-slate-700/50 to-slate-800/50 border-slate-600/50 hover:border-slate-500/50"
                }`}
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-500 ${
                    isPowerOn
                      ? "bg-red-500/30 text-red-400"
                      : "bg-slate-600/50 text-slate-400 group-active:text-slate-300"
                  }`}
                >
                  <Power
                    className={`w-4 h-4 ${isPowerOn ? "scale-110 shadow-red-500 drop-shadow-lg transition-transform" : "transition-transform"}`}
                  />
                </div>
              </button>
            </div> */}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-white landscape:hidden">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>
                <Wifi className="h-4 w-4 text-green-400" />
                <span className="text-xs font-medium text-green-500">
                  Connected
                </span>
              </>
            ) : (
              <>
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <WifiOff className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">
                  Not Connected
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col gap-0">
            <div>
              <span className="text-green-400 text-xs font-semibold animate-pulse">
                Front Sensing:
              </span>
              <span className="text-xs"> {sonar1} cm</span>
            </div>
            <div>
              <span className="text-orange-400 text-xs font-semibold animate-pulse">
                Rear Sensing:
              </span>
              <span className="text-xs"> {sonar2} cm</span>
            </div>
          </div>
        </div>
        {/* Control Sections */}
        {/* LANDSCAPE */}
        {/* LANDSCAPE */}
        <div className="grid sm:grid-cols-3 gap-0 items-center justify-center portrait:hidden">
          {/* Left Section - Forward/Backward */}
          <fieldset disabled={isAutoMode} className="flex justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col gap-10">
                {/* Forward Button */}
                <Button
                  onMouseDown={() => handleDirectionPress("f")}
                  onMouseUp={() => handleDirectionPress("s")}
                  onTouchStart={() => handleDirectionPress("f")}
                  onTouchEnd={() => handleDirectionPress("s")}
                  className="group relative w-20 h-20 rounded-2xl bg-linear-to-br from-slate-700 to-slate-800 border border-slate-600/50 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 active:scale-95 hover:border-emerald-500/50"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-500/0 to-emerald-500/0 group-active:from-emerald-500/20 group-active:to-transparent transition-all duration-300" />
                  <ArrowUp className="w-10 h-10 scale-250 mx-auto text-slate-300 group-active:text-emerald-400 transition-colors duration-300" />
                </Button>

                {/* Backward Button */}
                <Button
                  onMouseDown={() => handleDirectionPress("b")}
                  onMouseUp={() => handleDirectionPress("s")}
                  onTouchStart={() => handleDirectionPress("b")}
                  onTouchEnd={() => handleDirectionPress("s")}
                  className="group relative w-20 h-20 rounded-2xl bg-linear-to-br from-slate-700 to-slate-800 border border-slate-600/50 shadow-lg hover:shadow-orange-500/25 transition-all duration-300 active:scale-95 hover:border-orange-500/50"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-orange-500/0 to-orange-500/0 group-active:from-orange-500/20 group-active:to-transparent transition-all duration-300" />
                  <ArrowDown className="w-10 h-10 scale-250 mx-auto text-slate-300 group-active:text-orange-400 transition-colors duration-300" />
                </Button>
              </div>
            </div>
          </fieldset>
          <div className="flex flex-col gap-2 items-center justify-center">
            <button
              onClick={() => handleCutterToggle(!isCutterOn)}
              className={`group w-fit relative flex items-center gap-4 p-2 rounded-2xl border transition-all duration-500 ${
                isCutterOn
                  ? "bg-linear-to-br from-emerald-600/30 to-emerald-800/30 border-emerald-500/50 shadow-lg shadow-emerald-500/20"
                  : "bg-linear-to-br from-slate-700/50 to-slate-800/50 border-slate-600/50 hover:border-slate-500/50"
              }`}
            >
              <div
                className={`p-2 rounded-xl transition-all duration-500 ${
                  isCutterOn
                    ? "bg-emerald-500/30 text-emerald-400"
                    : "bg-slate-600/50 text-slate-400 group-active:text-slate-300"
                }`}
              >
                <Fan
                  className={`w-6 h-6 ${isCutterOn ? "scale-135 animate-spin transition-transform" : "animate-pulse transition-transform"}`}
                />
              </div>
            </button>

            <button
              onClick={() => handleAutoModeToggle(!isAutoMode)}
              className={`group w-fit relative flex items-center gap-4 p-2 rounded-2xl border transition-all duration-500 ${
                isAutoMode
                  ? "bg-linear-to-br from-blue-600/30 to-emerald-800/30 border-blue-500/50 shadow-lg shadow-blue-500/20"
                  : "bg-linear-to-br from-slate-700/50 to-slate-800/50 border-slate-600/50 hover:border-slate-500/50"
              }`}
            >
              <div
                className={`p-2 rounded-xl transition-all duration-500 ${
                  isAutoMode
                    ? "bg-blue-500/30 text-sky-400"
                    : "bg-slate-600/50 text-slate-400 group-active:text-slate-300"
                }`}
              >
                <CircleArrowUp
                  className={`w-6 h-6 ${isAutoMode ? "scale-100 animate-ping transition-transform" : "animate-pulse transition-transform"}`}
                />
              </div>
            </button>
          </div>
          {/* Right Section - Left/Right */}
          <fieldset disabled={isAutoMode} className="flex justify-center">
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-30 sm:gap-10">
                {/* Left Button */}
                <Button
                  onMouseDown={() => handleDirectionPress("l")}
                  onMouseUp={() => handleDirectionPress("s")}
                  onTouchStart={() => handleDirectionPress("l")}
                  onTouchEnd={() => handleDirectionPress("s")}
                  className="group relative w-20 h-20 rounded-2xl bg-linear-to-br from-slate-700 to-slate-800 border border-slate-600/50 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 active:scale-95 hover:border-cyan-500/50"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/0 to-cyan-500/0 group-active:from-cyan-500/20 group-active:to-transparent transition-all duration-300" />
                  <ArrowLeft className="w-10 h-10 scale-250 mx-auto text-slate-300 group-active:text-cyan-400 transition-colors duration-300" />
                </Button>

                {/* Right Button */}
                <Button
                  onMouseDown={() => handleDirectionPress("r")}
                  onMouseUp={() => handleDirectionPress("s")}
                  onTouchStart={() => handleDirectionPress("r")}
                  onTouchEnd={() => handleDirectionPress("s")}
                  className="group relative w-20 h-20 rounded-2xl bg-linear-to-br from-slate-700 to-slate-800 border border-slate-600/50 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 active:scale-95 hover:border-cyan-500/50"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/0 to-cyan-500/0 group-active:from-cyan-500/20 group-active:to-transparent transition-all duration-300" />
                  <ArrowRight className="w-10 h-10 scale-250 mx-auto text-slate-300 group-active:text-cyan-400 transition-colors duration-300" />
                </Button>
              </div>
            </div>
          </fieldset>
        </div>
        {/* LANDSCAPE */}
        {/* LANDSCAPE */}

        {/* PORTRAIT */}
        {/* PORTRAIT */}
        <div className="grid sm:grid-cols-3 gap-0 items-center justify-center landscape:hidden">
          <div className="flex flex-row gap-5 items-center justify-center pt-10">
            <button
              onClick={() => handleCutterToggle(!isCutterOn)}
              className={`group w-fit relative flex items-center gap-2 p-2 rounded-2xl border transition-all duration-500 ${
                isCutterOn
                  ? "bg-linear-to-br from-emerald-600/30 to-emerald-800/30 border-emerald-500/50 shadow-lg shadow-emerald-500/20"
                  : "bg-linear-to-br from-slate-700/50 to-slate-800/50 border-slate-600/50 hover:border-slate-500/50"
              }`}
            >
              <div
                className={`p-2 rounded-xl transition-all duration-500 ${
                  isCutterOn
                    ? "bg-emerald-500/30 text-emerald-400"
                    : "bg-slate-600/50 text-slate-400 group-active:text-slate-300"
                }`}
              >
                <Fan
                  className={`w-6 h-6 ${isCutterOn ? "scale-135 animate-spin transition-transform" : "animate-pulse transition-transform"}`}
                />
              </div>
              <span
                className={`text-sm ${isCutterOn ? "text-green-400" : "text-gray-500"}`}
              >
                Blades
              </span>
            </button>

            <button
              onClick={() => handleAutoModeToggle(!isAutoMode)}
              className={`group w-fit relative flex items-center gap-2 p-2 rounded-2xl border transition-all duration-500 ${
                isAutoMode
                  ? "bg-linear-to-br from-blue-600/30 to-emerald-800/30 border-blue-500/50 shadow-lg shadow-blue-500/20"
                  : "bg-linear-to-br from-slate-700/50 to-slate-800/50 border-slate-600/50 hover:border-slate-500/50"
              }`}
            >
              <div
                className={`p-2 rounded-xl transition-all duration-500 ${
                  isAutoMode
                    ? "bg-blue-500/30 text-sky-400"
                    : "bg-slate-600/50 text-slate-400 group-active:text-slate-300"
                }`}
              >
                <CircleArrowUp
                  className={`w-6 h-6 ${isAutoMode ? "scale-100 animate-ping transition-transform" : "animate-pulse transition-transform"}`}
                />
              </div>
              <span
                className={`text-sm ${isAutoMode ? "text-blue-400" : "text-gray-500"}`}
              >
                Automatic
              </span>
            </button>
          </div>

          {/* Left Section - Forward/Backward */}
          <fieldset disabled={isAutoMode}>
            <div className="flex flex-col items-center gap-4 mt-10">
              <div className="flex flex-col gap-30 mb-5">
                {/* Forward Button */}
                <Button
                  onMouseDown={() => handleDirectionPress("f")}
                  onMouseUp={() => handleDirectionPress("s")}
                  onTouchStart={() => handleDirectionPress("f")}
                  onTouchEnd={() => handleDirectionPress("s")}
                  className="group relative w-20 h-20 rounded-2xl bg-linear-to-br from-slate-700 to-slate-800 border border-slate-600/50 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 active:scale-95 hover:border-emerald-500/50"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-500/0 to-emerald-500/0 group-active:from-emerald-500/20 group-active:to-transparent transition-all duration-300" />
                  <ArrowUp className="w-10 h-10 scale-250 mx-auto text-slate-300 group-active::text-emerald-400 transition-colors duration-300" />
                </Button>
              </div>
            </div>
          </fieldset>

          {/* Right Section - Left/Right */}
          <fieldset disabled={isAutoMode} className="flex justify-center">
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-30 sm:gap-10">
                {/* Left Button */}
                <Button
                  onMouseDown={() => handleDirectionPress("l")}
                  onMouseUp={() => handleDirectionPress("s")}
                  onTouchStart={() => handleDirectionPress("l")}
                  onTouchEnd={() => handleDirectionPress("s")}
                  className="group relative w-20 h-20 rounded-2xl bg-linear-to-br from-slate-700 to-slate-800 border border-slate-600/50 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 active:scale-95 hover:border-cyan-500/50"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/0 to-cyan-500/0 group-active:from-cyan-500/20 group-active:to-transparent transition-all duration-300" />
                  <ArrowLeft className="w-10 h-10 scale-250 mx-auto text-slate-300 group-active:text-cyan-400 transition-colors duration-300" />
                </Button>

                {/* Right Button */}
                <Button
                  onMouseDown={() => handleDirectionPress("r")}
                  onMouseUp={() => handleDirectionPress("s")}
                  onTouchStart={() => handleDirectionPress("r")}
                  onTouchEnd={() => handleDirectionPress("s")}
                  className="group relative w-20 h-20 rounded-2xl bg-linear-to-br from-slate-700 to-slate-800 border border-slate-600/50 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 active:scale-95 hover:border-cyan-500/50"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/0 to-cyan-500/0 group-active:from-cyan-500/20 group-active:to-transparent transition-all duration-300" />
                  <ArrowRight className="w-10 h-10 scale-250 mx-auto text-slate-300 group-active:text-cyan-400 transition-colors duration-300" />
                </Button>
              </div>
            </div>
          </fieldset>

          <fieldset disabled={isAutoMode}>
            <div className="flex items-center justify-center mt-5">
              {/* Backward Button */}
              <Button
                onMouseDown={() => handleDirectionPress("b")}
                onMouseUp={() => handleDirectionPress("s")}
                onTouchStart={() => handleDirectionPress("b")}
                onTouchEnd={() => handleDirectionPress("s")}
                className="group relative w-20 h-20 rounded-2xl bg-linear-to-br from-slate-700 to-slate-800 border border-slate-600/50 shadow-lg hover:shadow-orange-500/25 transition-all duration-300 active:scale-95 hover:border-orange-500/50"
              >
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-orange-500/0 to-orange-500/0 group-active:from-orange-500/20 group-active:to-transparent transition-all duration-300" />
                <ArrowDown className="w-10 h-10 scale-250 mx-auto text-slate-300 group-active:text-orange-400 transition-colors duration-300" />
              </Button>
            </div>
          </fieldset>
        </div>
        {/* PORTRAIT */}
        {/* PORTRAIT */}
      </div>
    </div>
  );
};

export default MowerControlPanel;
