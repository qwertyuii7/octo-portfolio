import { useEffect, useState, useCallback } from 'react';

type WebShot = {
  id: number;
  x: number;
  y: number;
  rotation: number;
};

export function useWebShooter(isSpidey: boolean) {
  const [shots, setShots] = useState<WebShot[]>([]);

  const handleGlobalClick = useCallback((e: MouseEvent) => {
    if (!isSpidey) return;

    const newShot: WebShot = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      rotation: Math.random() * 40 - 20, 
    };

    setShots(prev => [...prev, newShot]);

    setTimeout(() => {
      setShots(prev => prev.filter(shot => shot.id !== newShot.id));
    }, 1000);
  }, [isSpidey]);

  useEffect(() => {
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [handleGlobalClick]);

  return shots;
}
