import { useState, useEffect } from "react";
import { navItems, profile } from "../data/mockData";
import { motion, AnimatePresence } from "motion/react";

function NavLogo() {
  return (
    <a className="flex items-center gap-2 group" href="#">
      <div className="font-comic-hero text-xl sm:text-2xl font-black uppercase tracking-widest text-red-600 dark:text-red-500 border-2 border-red-600 px-2 py-0.5 bg-neutral-900 shadow-[2px_2px_0px_0px_rgba(226,54,54,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-75">
        MAYANK CHAUDHARY
      </div>
      <span className="hidden sm:inline-block bg-yellow-400 text-neutral-950 font-black text-[10px] sm:text-xs px-1.5 py-0.5 border border-black rotate-[-4deg] tracking-tight font-comic-hero uppercase shadow-[1px_1px_0px_#000]">
        EARTH-616
      </span>
    </a>
  );
}

function SideNavDrawer({
  isOpen,
  onClose,
  items,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: typeof navItems;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm md:hidden"
          />

          {/* Side Drawer Panel (Comic styled) */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[9999] w-[300px] max-w-[85vw] flex flex-col bg-neutral-950 border-l-4 border-black shadow-[-8px_0_0_0_#E23636] p-6 md:hidden overflow-y-auto"
          >
            {/* Top Header */}
            <div className="flex items-center justify-between pb-6 border-b-2 border-neutral-800">
              <span className="font-comic-hero text-2xl font-black text-red-500 uppercase tracking-widest">MENU</span>
              <button
                onClick={onClose}
                className="p-1 border-2 border-black bg-yellow-400 text-black shadow-[2px_2px_0px_#000] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all flex items-center justify-center cursor-pointer font-comic-hero font-black text-xl w-8 h-8 leading-none"
              >
                X
              </button>
            </div>

            {/* Navigation Links List */}
            <div className="flex-1 py-8 flex flex-col gap-4">
              {items.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.2 }}
                  className="py-3 px-4 bg-neutral-900 border-2 border-black shadow-[3px_3px_0px_#1A3A7A] flex items-center justify-between group text-white hover:bg-neutral-800 transition-colors"
                >
                  <span className="text-xl font-comic-hero font-black uppercase tracking-wider">{item.label}</span>
                  <span className="text-red-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Bottom Footer / Action Area */}
            <div className="pt-6 border-t-2 border-neutral-800 flex flex-col gap-4">
              <div className="flex justify-between items-center px-1 mb-2">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-comic-mono text-[10px] text-neutral-400 uppercase tracking-widest hover:text-yellow-400 transition-colors"
                >
                  github/@{profile.githubUsername} ↗
                </a>
              </div>

              {/* Let's Talk CTA */}
              <a
                href="#contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 bg-red-600 border-2 border-black py-3 shadow-[4px_4px_0px_#FFD700] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#FFD700] active:translate-y-0 active:shadow-none transition-all font-comic-hero text-xl font-black text-white uppercase tracking-wider"
              >
                <span className="text-yellow-300">⚡</span> Let's Talk
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[9000] w-full bg-neutral-950 border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <NavLogo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-neutral-100 hover:text-yellow-400 font-comic-hero text-xl lg:text-2xl uppercase tracking-wider transition-colors duration-150 hover:scale-105 active:scale-95"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#terminal"
              className="w-10 h-10 flex items-center justify-center bg-neutral-900 border-2 border-neutral-800 hover:border-yellow-400 text-neutral-300 hover:text-yellow-400 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-sm font-comic-mono font-bold"
              title="Spider Terminal"
            >
              $
            </a>
            <a
              href="#contact"
              className="font-comic-hero font-black tracking-wider text-xl lg:text-2xl uppercase bg-red-600 hover:bg-red-500 text-white px-5 py-1.5 border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,215,0,1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2"
            >
              LET'S TALK <span className="text-yellow-300 text-xl">→</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex items-center justify-center p-2 border-2 border-black bg-neutral-900 text-white shadow-[2px_2px_0px_#E23636] active:translate-y-0.5 active:shadow-none transition-all"
            onClick={() => setOpen(!open)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <SideNavDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        items={navItems}
      />
    </>
  );
}
