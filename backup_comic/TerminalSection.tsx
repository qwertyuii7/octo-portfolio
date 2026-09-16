import { useEffect, useRef, useState } from "react";
import { terminalCommandResponses as COMMANDS } from "../data/mockData";
import { useAudio } from "./ui/terminal";

type Line = { type: "cmd" | "out"; text: string };

export function TerminalSection() {
  const { down, up } = useAudio(true);
  const [history, setHistory]     = useState<Line[]>([{ type: "out", text: "Welcome to Spider-Terminal OS v2.0 (Earth-616)\nType 'help' to view available protocols." }]);
  const [input, setInput]         = useState("");
  const [matrixActive, setMatrix] = useState(false);
  const [matrixFlash, setFlash]   = useState(false);
  const [autoTyped, setAuto]      = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef    = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const isVisible  = useRef(true);

  // Auto-scroll smoothly on history update or new commands
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [history]);

  // Auto-type on reveal and track visibility
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      isVisible.current = e.isIntersecting;
      if (e.isIntersecting && !autoTyped) {
        setAuto(true);
        setTimeout(() => {
          setHistory(p => [...p, { type: "cmd", text: "whoami" }]);
          setTimeout(() => setHistory(p => [...p, { type: "out", text: COMMANDS.whoami }]), 500);
        }, 900);
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [autoTyped]);

  const handleCommand = (cmd: string) => {
    const t = cmd.trim().toLowerCase();
    if (!t) return;
    
    setHistory(p => [...p, { type: "cmd", text: cmd }]);
    setInput("");
    
    setTimeout(() => {
      if (t === "clear") {
        setHistory([]);
      } else if (t === "sudo") {
        setHistory(p => [...p, { type: "out", text: "nice try, kid. even spidey needs permission for that." }]);
      } else if (t === "web-shooters") {
        setHistory(p => [...p, { type: "out", text: "FWSHHH! *thwip* web fluid at 98% capacity." }]);
      } else if (t === "matrix") {
        setMatrix(m => !m);
        setHistory(p => [...p, { type: "out", text: matrixActive ? "Matrix off." : "Initiating Matrix Protocol..." }]);
      } else if (t === "hack") {
        setFlash(true);
        setTimeout(() => setFlash(false), 4000);
        setHistory(p => [...p, { type: "out", text: "OVERRIDE ACCEPTED. INITIATING PROTOCOL." }]);
      } else {
        const out = (COMMANDS as Record<string, string>)[t] || `bash: ${t}: command not found. Type 'help'.`;
        setHistory(p => [...p, { type: "out", text: out }]);
      }
    }, 150);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      down("Enter");
      handleCommand(input);
    }
  };
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") up("Enter");
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12 border-b-4 border-neutral-900 bg-neutral-950 relative overflow-hidden" id="terminal">
      {/* Background patterns */}
      <div className="absolute inset-0 comic-halftone-blue opacity-10 pointer-events-none" />
      <div className="absolute -left-32 -bottom-32 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      {matrixFlash && (
        <div className="matrix-flash z-[99990]">
          <div className="matrix-flash-msg">ACCESS GRANTED</div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Issue Header */}
        <div className="reveal-item inline-flex items-center gap-3 px-3 py-1.5 bg-neutral-900 border-2 border-black shadow-[3px_3px_0px_#1A3A7A] mb-8">
          <span className="font-comic-mono text-xs text-blue-500 font-bold uppercase tracking-wider">PANEL #06: SYSTEM ACCESS</span>
          <span className="text-neutral-600">|</span>
          <span className="font-comic-mono text-xs text-yellow-400 uppercase tracking-wider">COMMAND CENTER</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Terminal Description */}
          <div className="lg:col-span-4 flex flex-col justify-center reveal-item">
            <h2 className="font-comic-hero text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white comic-title-3d-sm mb-6">
              SPIDER<br />TERMINAL<br />v2.0
            </h2>
            
            <div className="bg-[#FFE81F]/10 border-2 border-black p-5 shadow-[4px_4px_0px_#000] relative group hover:bg-[#FFE81F]/20 transition-colors">
              <div className="absolute -top-3 left-4 bg-yellow-400 text-black font-comic-hero text-[10px] px-2 py-0.5 border border-black uppercase">
                NARRATOR
              </div>
              <p className="font-comic-body text-sm text-neutral-300 leading-relaxed italic">
                "Every hero needs a command center. Access Mayank's secure terminal to view his arsenal, mission logs, and web-shooter status. Just don't type 'sudo' unless you want trouble."
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <span className="bg-neutral-900 border-2 border-neutral-700 text-neutral-400 font-comic-mono text-[10px] px-2 py-1 shadow-[2px_2px_0px_#000] cursor-pointer hover:border-red-500 hover:text-white transition-colors" onClick={() => handleCommand('help')}>
                &gt; help
              </span>
              <span className="bg-neutral-900 border-2 border-neutral-700 text-neutral-400 font-comic-mono text-[10px] px-2 py-1 shadow-[2px_2px_0px_#000] cursor-pointer hover:border-red-500 hover:text-white transition-colors" onClick={() => handleCommand('skills')}>
                &gt; skills
              </span>
              <span className="bg-neutral-900 border-2 border-neutral-700 text-neutral-400 font-comic-mono text-[10px] px-2 py-1 shadow-[2px_2px_0px_#000] cursor-pointer hover:border-red-500 hover:text-white transition-colors" onClick={() => handleCommand('web-shooters')}>
                &gt; web-shooters
              </span>
            </div>
          </div>

          {/* Right: The Terminal 3D Element */}
          <div className="lg:col-span-8 reveal-item" style={{ transitionDelay: ".2s" }}>
            <div className="terminal-3d-wrapper">
              <div className="terminal-shell floating-3d bg-[#0a0a0a] border-4 border-black shadow-[12px_12px_0px_0px_#E23636] relative overflow-hidden">
                
                {/* Comic CRT scanlines overlay */}
                <div className="comic-scanlines" />

                {/* Titlebar */}
                <div className="bg-neutral-900 px-4 py-3 border-b-4 border-black flex items-center justify-between relative z-20">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-600 border-2 border-black" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-black" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-black" />
                  </div>
                  <div className="font-comic-mono text-xs text-neutral-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="text-red-500">🕸️</span> spidey@portfolio:~
                  </div>
                  <div className="w-16" /> {/* Spacer for balance */}
                </div>

                {/* Output Area */}
                <div 
                  ref={bodyRef} 
                  className="p-6 font-comic-mono text-sm leading-relaxed text-emerald-400 min-h-[380px] max-h-[480px] overflow-y-auto relative z-20"
                  onClick={() => inputRef.current?.focus()}
                  style={{ textShadow: "0 0 5px rgba(16, 185, 129, 0.3)" }}
                >
                  {history.map((line, i) => (
                    <div key={i} className="mb-2 whitespace-pre-wrap">
                      {line.type === "cmd" && <span className="text-red-500 font-bold mr-2">spidey@portfolio:~$</span>}
                      <span className={line.type === "cmd" ? "text-white" : "text-emerald-400/90"}>{line.text}</span>
                    </div>
                  ))}

                  {/* Input Row */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-red-500 font-bold">spidey@portfolio:~$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={onKeyDown}
                      onKeyUp={onKeyUp}
                      className="bg-transparent border-none text-white font-comic-mono text-sm flex-1 outline-none caret-red-500 shadow-none focus:ring-0"
                      autoComplete="off"
                      spellCheck="false"
                      autoFocus
                    />
                  </div>
                </div>
              </div>
              <div className="terminal-ground-shadow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
