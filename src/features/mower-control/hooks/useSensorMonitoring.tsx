import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { ref, onValue } from "firebase/database";

export function useSensorMonitoring() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [sonar1, setSonar1] = useState<number | null>(null);
  const [sonar2, setSonar2] = useState<number | null>(null);
  const [control, setControl] = useState<string | null>(null);
  const [autoMode, setIsAutoMode] = useState<number | null>(0);
  const [cutter, setCutter] = useState<number | null>(0);
  const [powerSwitch, setPowerSwitch] = useState<boolean | null>(null);

  const controlRef = ref(db, "control");
  const autoModeRef = ref(db, "auto");
  const cutterRef = ref(db, "cutter");
  const connectedRef = ref(db, ".info/connected");
  const powerSwitchRef = ref(db, "power_switch");  

  useEffect(() => {
    const sonar1Ref = ref(db, "sonar1");
    const sonar2Ref = ref(db, "sonar2");
    const unSubSonar1 = onValue(sonar1Ref, (snapshot) => {
      const val = snapshot.val();
      setSonar1(val !== null ? Number(val) : null);
    });

    const unSubSonar2 = onValue(sonar2Ref, (snapshot) => {
      const val = snapshot.val();
      setSonar2(val !== null ? Number(val) : null);
    });

    const unSubControl = onValue(controlRef, (snapshot) => {
      const val = snapshot.val();
      setControl(val !== null ? String(val) : null);
    });

    const unSubAutoMode = onValue(autoModeRef, (snapshot) => {
      const val = snapshot.val();
      setIsAutoMode(val !== null ? Number(val) : null);
    });

    const unSubCutter = onValue(cutterRef, (snapshot) => {
      const val = snapshot.val();
      setCutter(val !== null ? Number(val) : null);
    });

    const usSubConnection = onValue(connectedRef, (snap) => {
      setIsConnected(snap.val() === true);
    });

    const unSubPowerOn = onValue(powerSwitchRef, (snapshot) => {
      const val = snapshot.val();
      setPowerSwitch(val !== null ? Boolean(val) : null);
    });

    return () => {
      unSubSonar1();
      unSubSonar2();
      unSubControl();
      unSubAutoMode();
      unSubCutter();
      usSubConnection();
      unSubPowerOn();
    };
  }, []);

  return {
    sonar1,
    sonar2,
    control,
    controlRef,
    autoMode,
    autoModeRef,
    cutter,
    cutterRef,
    isConnected,
    powerSwitch,
    powerSwitchRef,
  };
}
