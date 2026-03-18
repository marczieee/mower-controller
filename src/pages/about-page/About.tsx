import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Shield, Smartphone, Leaf, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Battery Powered",
      description:
        "Eco-friendly rechargeable battery system for sustainable operation",
      color: "emerald",
    },
    {
      icon: Shield,
      title: "Smart Sensors",
      description:
        "Advanced ultrasonic sensors for obstacle detection and navigation",
      color: "cyan",
    },
    {
      icon: Smartphone,
      title: "Mobile Control",
      description: "Real-time monitoring and control from your mobile device",
      color: "blue",
    },
    {
      icon: Leaf,
      title: "Automatic Mode",
      description:
        "Intelligent auto-mowing with adaptive grass cutting patterns",
      color: "green",
    },
  ];

  return (
    <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen w-screen overflow-auto">
      {/* Glowing accent */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto p-6 pb-12">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          className="group mb-8 bg-linear-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50 hover:border-emerald-500/50 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-slate-300">Back</span>
        </Button>

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2">
            <div className="w-fit portrait:w-fit flex items-center landscape:justify-end justify-center mr-2">
              <img
                src="/mower_logo_fit.png"
                className="object-cover w-20 h-20 mb-5 landscape:w-30 landscape:h-30"
              />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              iCUT
            </h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Automated Battery-Powered Grasscutter with Mobile Monitoring
          </p>
          <div className="mt-6 inline-block px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/50">
            <span className="text-emerald-400 text-sm font-semibold">
              Smart Lawn Care Technology
            </span>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mb-16 p-8 rounded-2xl bg-linear-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/50 shadow-xl">
          <h2 className="text-3xl font-bold text-transparent bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text mb-4">
            About
          </h2>
          <p className="text-slate-300 text-sm text-justify">
            The goal of this is to make grass cutting easier, safer, and less
            tiring for users by reducing the need for manual labor. The system
            allows the user to check the status and control basic functions of
            the grass cutter through a mobile application. By using automation
            and mobile monitoring, the project aims to save time, improve
            efficiency, and provide a more convenient and modern way of
            maintaining lawns and grassy areas.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-transparent bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text mb-8">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-linear-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/50 hover:border-emerald-500/50 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                >
                  <div
                    className={`inline-block p-3 rounded-xl bg-${feature.color}-500/20 mb-4`}
                  >
                    <Icon className={`w-6 h-6 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-200 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mb-16 p-8 rounded-2xl bg-linear-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/50 shadow-xl">
          <h2 className="text-3xl font-bold text-transparent bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text mb-6">
            Technical Specifications
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between border-b border-slate-600/50 pb-2">
                <span className="text-slate-400">Power Source</span>
                <span className="text-emerald-400 font-semibold">
                  Rechargeable Battery
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-600/50 pb-2">
                <span className="text-slate-400">Sensors</span>
                <span className="text-cyan-400 font-semibold">
                  Dual Ultrasonic
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-600/50 pb-2">
                <span className="text-slate-400">Control System</span>
                <span className="text-blue-400 font-semibold">Mobile App</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-slate-600/50 pb-2">
                <span className="text-slate-400">Operation Modes</span>
                <span className="text-emerald-400 font-semibold">
                  Manual & Auto
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-600/50 pb-2">
                <span className="text-slate-400">Connectivity</span>
                <span className="text-cyan-400 font-semibold">
                  Real-time WiFi
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-600/50 pb-2">
                <span className="text-slate-400">Safety Features</span>
                <span className="text-blue-400 font-semibold">
                  Obstacle Detection
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center p-8 rounded-2xl bg-linear-to-br from-emerald-600/20 to-cyan-600/20 border border-emerald-500/50 shadow-lg shadow-emerald-500/10">
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">
            Get in Touch
          </h2>
          <p className="text-slate-300 mb-6">
            Have questions or want to learn more about iCUT?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="mailto:info@icut.com"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 hover:border-emerald-500/50 transition-all duration-300"
            >
              <Mail className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              <span className="text-slate-300 group-hover:text-emerald-400 transition-colors">
                Email Us
              </span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            © 2024 iCUT. Powering the future of lawn care technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
