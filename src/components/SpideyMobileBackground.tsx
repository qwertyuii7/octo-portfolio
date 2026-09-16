import React from 'react';
import { motion } from 'framer-motion';

export function SpideyMobileBackground() {
  const images = [
    "0e0cbba8043144850fa860219b41f9ba.webp",
    "268127e6202c2e8b966c05e158451d21.webp",
    "3c5ff79411f2a16d56f8af3f9a8ab94e.webp",
    "4255d3936cfe0d4cbdc41e3f48e6763d.webp",
    "72a42ff1f5db74593f248172355dc361.webp",
    "b9027d9bdf3721a4f19c5a865262d8f7.webp",
    "f46f6b2fb939804cc98a772952ec3dab.webp",
    "fc02d2bac2bf7c2fadd9fb8006713d6a.webp",
    "e0a3f6cf4e60a6d907cc7e6572e3ac23.webp",
    "OIP (7).webp",
    "OIP (8).webp",
    "OIP (9).webp"
  ];

  // We want to create a rich comic-panel aesthetic
  return (
    <div className="fixed inset-0 w-full h-full z-[-1] overflow-hidden bg-transparent pointer-events-none opacity-100">
      {/* Dense masonry grid behind everything */}
      <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 gap-2 p-2 h-[120%] -top-[10%]">
        {images.map((img, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, duration: 1 }}
            className={`w-full h-full relative overflow-hidden border-[3px] border-[#E23636]/60 
              ${idx === 0 || idx === 3 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}
              ${idx % 2 === 0 ? 'transform -rotate-1' : 'transform rotate-1'}
            `}
          >
            <img 
              src={`/assets/spidey_assets/${img}`} 
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-110" 
              alt="Spidey Comic Panel"
            />
            {/* Red cinematic overlay on the images */}
            <div className="absolute inset-0 bg-red-700/40 mix-blend-multiply" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
