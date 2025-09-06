"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isProductivityLoaded, setIsProductivityLoaded] = useState(false);
  const [minTimeReached, setMinTimeReached] = useState(false);

  useEffect(() => {
    // 3-second minimum timer
    const minTimer = setTimeout(() => {
      setMinTimeReached(true);
    }, 3000);

    // Create an image to preload productivity.svg specifically
    const img = new Image();
    img.onload = () => {
      setIsProductivityLoaded(true);
    };
    img.onerror = () => {
      // Even if it fails, mark as loaded
      setIsProductivityLoaded(true);
    };
    img.src = "/productivity.svg";

    return () => clearTimeout(minTimer);
  }, []);

  // Show loading screen until BOTH conditions are met: 3 seconds passed AND productivity loaded
  if (!isProductivityLoaded || !minTimeReached) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}