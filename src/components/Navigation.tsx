import { useState, useEffect } from "react";
import { navItems, profile } from "../data/mockData";
import { HangingDevCard } from "./HangingDevCard";
import { motion, AnimatePresence } from "motion/react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";

function NavLogo({ visible }: { visible?: boolean }) {
  return (
    <AnimatePresence mode="popLayout">
      {!visible && (
        <motion.a
          initial={{ opacity: 0, width: 0, marginRight: 0 }}
          animate={{ opacity: 1, width: "auto", marginRight: 16 }}
          exit={{ opacity: 0, width: 0, marginRight: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          href="#hero"
          className="relative z-20 shrink-0 font-bold overflow-hidden whitespace-nowrap"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
            textDecoration: "none",
          }}
        >
          @{profile.githubUsername}
        </motion.a>
      )}
    </AnimatePresence>
  );
}

function NavModeButton({
  visible,
  theme,
  toggleTheme,
}: {
  visible?: boolean;
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <AnimatePresence mode="popLayout">
      {!visible && (
        <motion.button
          initial={{ opacity: 0, width: 0, marginRight: 0 }}
          animate={{ opacity: 1, width: "auto", marginRight: 176 }}
          exit={{ opacity: 0, width: 0, marginRight: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          onClick={toggleTheme}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: ".15em",
            color: "var(--text-muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px 0",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          className="relative z-20 shrink-0"
        >
          <span className="hidden xl:inline">[ MODE: {theme.toUpperCase()} ]</span>
          <span className="inline xl:hidden">[ MODE ]</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function SideNavDrawer({
  isOpen,
  onClose,
  theme,
  toggleTheme,
  items,
}: {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
  toggleTheme: () => void;
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
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm md:hidden"
          />

          {/* Side Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[9999] w-[280px] sm:w-[320px] max-w-[85vw] flex flex-col justify-between bg-[var(--nav-bg)] backdrop-blur-2xl border-l border-[var(--border-primary)] shadow-[0_0_50px_rgba(0,0,0,0.6)] p-6 md:hidden overflow-y-auto"
          >
            {/* Top Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[var(--border-primary)]">
              <a
                href="#hero"
                onClick={onClose}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 14,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  fontWeight: 800,
                }}
              >
                @{profile.githubUsername}
              </a>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] hover:bg-[var(--border-primary)] transition-colors flex items-center justify-center cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links List */}
            <div className="flex-1 py-8 flex flex-col gap-3">
              <span className="text-xs font-mono tracking-widest text-[var(--text-muted)] uppercase mb-2 block">
                // Navigation
              </span>
              {items.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.2 }}
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    textDecoration: "none",
                  }}
                  className="py-3.5 px-4 rounded-xl bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] border border-transparent hover:border-[var(--border-primary)] transition-all flex items-center justify-between group text-[var(--text-primary)]"
                >
                  <span className="text-lg font-bold tracking-tight">{item.label}</span>
                  <span className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Bottom Footer / Action Area */}
            <div className="pt-6 border-t border-[var(--border-primary)] flex flex-col gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
                className="w-full py-3 px-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-xs tracking-widest text-[var(--text-primary)] uppercase flex items-center justify-between hover:bg-[var(--border-primary)] transition-colors cursor-pointer"
              >
                <span>Theme Mode:</span>
                <span className="font-bold text-[var(--card-accent)]">[ {theme.toUpperCase()} ]</span>
              </button>

              {/* GitHub Profile Link */}
              <div className="flex justify-between items-center px-1">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                  }}
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  github/@{profile.githubUsername} ↗
                </a>
              </div>

              {/* Hire Me CTA Button */}
              <a
                href="#contact"
                onClick={onClose}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                  padding: "14px 20px",
                  borderRadius: "16px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  textDecoration: "none",
                }}
                className="shadow-lg hover:border-[var(--card-accent)] transition-colors"
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#3fb950",
                    boxShadow: "0 0 8px #3fb950",
                    display: "inline-block",
                    animation: "pulseGlow 2s ease-in-out infinite",
                  }}
                />
                Hire Me
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
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "night");

  useEffect(() => {
    if (theme === "draft") {
      document.documentElement.setAttribute("data-theme", "draft");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === "night" ? "draft" : "night");
  };

  const formattedNavItems = navItems.map(item => ({
    name: item.label,
    link: item.href,
  }));

  return (
    <Navbar className="fixed top-0 inset-x-0 z-[9000] w-full">
      {/* ── PINNED HANGING DEV CARD (Only shown on devices with macbook component, md: and up) ── */}
      <div className="fixed top-0 right-6 md:right-12 z-[9001] h-16 hidden md:flex items-center pointer-events-auto">
        <HangingDevCard />
      </div>

      {/* ── DESKTOP & TABLET RESIZABLE NAVBAR ── */}
      <NavBody className="transition-all duration-300">
        <NavLogo />
        <NavItems items={formattedNavItems} />
        <NavModeButton theme={theme} toggleTheme={toggleTheme} />
      </NavBody>

      {/* ── MOBILE RESIZABLE NAVBAR ── */}
      <MobileNav className="transition-all duration-300">
        <MobileNavHeader>
          <NavLogo />
          <div className="flex items-center gap-3">
            <NavModeButton theme={theme} toggleTheme={toggleTheme} />
            <MobileNavToggle isOpen={open} onClick={() => setOpen(!open)} />
          </div>
        </MobileNavHeader>
      </MobileNav>

      {/* ── MOBILE SIDE NAVIGATION DRAWER (Outside MobileNav so never clipped!) ── */}
      <SideNavDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
        items={navItems}
      />
    </Navbar>
  );
}
