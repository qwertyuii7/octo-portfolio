import { useState, useEffect } from "react";

export function useBootloader() {
  const [booting, setBooting] = useState(true);
  const [progress, setProgress] = useState(0);
  const [linesVisible, setLinesVisible] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Natural, exponential ease-out increment for high-end studio feel
      const remaining = 100 - current;
      const step = Math.max(1, Math.floor(remaining * 0.16));
      current = Math.min(100, current + step);
      setProgress(current);
      setLinesVisible(Math.floor((current / 100) * 8));

      if (current >= 100) {
        clearInterval(interval);
        // Allow the StudioLoader 850ms to finish its architectural curtain wipe exit animation
        setTimeout(() => setBooting(false), 850);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return { booting, progress, linesVisible };
}
