import { useState, useEffect } from "react";

export function useBootloader() {
  const [booting, setBooting] = useState(true);
  const [linesVisible, setLinesVisible] = useState(0);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      currentLine++;
      setLinesVisible(currentLine);
      if (currentLine >= 7) {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 600);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return { booting, linesVisible };
}
