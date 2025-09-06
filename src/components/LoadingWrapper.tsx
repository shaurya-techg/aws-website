"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "./LoadingScreen";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isProductivityLoaded, setIsProductivityLoaded] = useState(false);
  const [minTimeReached, setMinTimeReached] = useState(false);
  const pathname = usePathname();

  // Only show loading screen on the main page (/)
  const isMainPage = pathname === '/';

  useEffect(() => {
    // Only run loading logic if we're on the main page
    if (!isMainPage) {
      setIsProductivityLoaded(true);
      setMinTimeReached(true);
      return;
    }

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
  }, [isMainPage]);

  // Show loading screen only on main page and until BOTH conditions are met: 3 seconds passed AND productivity loaded
  if (isMainPage && (!isProductivityLoaded || !minTimeReached)) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}