import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
// import logo_round from "/logo_main.png";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PWAInstallPrompt: React.FC = () => {
  const [openAlert, setOpenAlert] = useState(true);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const isPWAInstalled = (): boolean => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://")
    );
  };

  //   useEffect(() => {
  //     setShowInstallPrompt(true); // ← Force show for test
  //   }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    if (isPWAInstalled()) {
      setIsInstalled(true);
      setShowInstallPrompt(false);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const { outcome } = await deferredPrompt.prompt();
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error("Error during install prompt:", error);
    }
  };

  if (!showInstallPrompt || isInstalled || !openAlert) return null;

  return (
    <div className="fixed bottom-4 right-4 w-70 p-4 bg-linear-to-r from-(--color-primary) to-(--color-primary) text-white shadow-lg rounded-md z-50">
      <div className="flex items-center gap-3">
        <img
          src={"/mower_logo_fit.png"}
          alt="App Logo"
          className="w-10 h-10 rounded-full"
        />

        <div>
          <h3 className="font-semibold text-sm">Download the App</h3>
          <p className="text-xs font-bold text-white/80">Version 1.0</p>
          <p className="text-xs text-white/80">Install on any platform</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setOpenAlert(false)}
          className="text-xs text-white/70 hover:underline"
        >
          Dismiss
        </button>
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1 bg-white text-(--color-primary) text-xs font-medium py-1 px-3 rounded hover:bg-white/90"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
