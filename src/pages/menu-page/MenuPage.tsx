import { useNavigate } from "react-router-dom";
import { Info, ArrowRight, Fan } from "lucide-react";
import { Button } from "@/components/ui/button";

const MenuPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen w-screen flex items-center justify-center p-8 sm:p-6 md:p-8">
      {/* Glowing accent */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md landscape:max-w-2xl landscape:max-h-[90vh] landscape:flex landscape:flex-col landscape:justify-center">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 landscape:mb-6 landscape:flex landscape:items-center">
          <div className="w-60 portrait:w-full flex items-center landscape:justify-end justify-center mr-4">
            <img
              src="/mower_logo_fit.png"
              className="object-cover w-40 h-40 mb-8 landscape:w-30 landscape:h-30"
            />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl landscape:text-5xl font-bold bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4 landscape:mb-2 animate-pulse">
            iCUT
          </h1>
          <p className="landscape:text-start text-slate-400 text-xs sm:text-sm md:text-base landscape:text-sm leading-relaxed px-4">
            Automated Battery-Powered Grasscutter{" "}
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            with Mobile Monitoring
          </p>
        </div>

        {/* Menu Buttons */}
        <div className="flex flex-col landscape:flex-row gap-4 sm:gap-4 landscape:gap-6 landscape:justify-center">
          {/* Start Mowing Button */}
          <Button
            onClick={() => navigate("/mower")}
            className="group relative animate-pulse border border-gray-700 h-20 sm:h-20 landscape:h-24 landscape:w-64 rounded-2xl active:bg-linear-to-br bg-slate-600/20 active:from-emerald-600/30 active:to-emerald-800/30 active:border-emerald-500/50 active:shadow-lg shadow-emerald-500/20 active:shadow-emerald-500/40 transition-all duration-300 active:scale-95"
          >
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/20 group-hover:to-transparent transition-all duration-300" />
            <div className="relative flex items-center justify-between w-full px-4 sm:px-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 rounded-xl bg-emerald-500/30">
                  <Fan className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                </div>
                <span className="text-base sm:text-lg font-semibold text-emerald-400">
                  Start Mower
                </span>
              </div>
              <ArrowRight className="w-5 h-5 animate-caret-blink sm:w-6 sm:h-6 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>

          {/* About Button */}
          <Button
            onClick={() => navigate("/about")}
            className="group relative border border-gray-700 h-20 sm:h-20 landscape:h-24 landscape:w-64 rounded-2xl active:bg-linear-to-br bg-slate-600/20 active:from-emerald-600/30 active:to-emerald-800/30 active:border-emerald-500/50 active:shadow-lg shadow-emerald-500/20 active:shadow-emerald-500/40 transition-all duration-300 active:scale-95"
          >
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:to-transparent transition-all duration-300" />
            <div className="relative flex items-center justify-between w-full px-4 sm:px-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 rounded-xl bg-slate-600/50 group-hover:bg-cyan-500/30 transition-colors">
                  <Info className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <span className="text-base sm:text-lg font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">
                  About
                </span>
              </div>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-12 sm:mt-16 landscape:mt-6 text-center">
          <p className="text-slate-500 text-xs sm:text-sm">iCUT Mower</p>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
