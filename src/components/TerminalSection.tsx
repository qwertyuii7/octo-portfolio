import { useEffect, useRef, useState } from "react";
import { terminalCommandResponses as COMMANDS } from "../data/mockData";

type Line = { type: "cmd" | "out"; text: string };

export function TerminalSection() {
  const [history, setHistory]     = useState<Line[]>([{ type: "out", text: "Welcome. Type 'help' to see available commands." }]);
  const [input, setInput]         = useState("");
  const [matrixActive, setMatrix] = useState(false);
  const [matrixFlash, setFlash]   = useState(false);
  const [autoTyped, setAuto]      = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef    = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);     // in-terminal subtle bg
  const flashRef   = useRef<HTMLCanvasElement>(null);    // full-page dramatic overlay
  const matrixReq  = useRef<number | null>(null);
  const flashReq   = useRef<number | null>(null);
  const isVisible  = useRef(true);

  // Auto-scroll
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
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

  // Subtle in-terminal matrix background
  useEffect(() => {
    if (!matrixActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    if (!ctx) return;
    const CHARS  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
    const FS     = 12;
    let cols: number[] = [];
    let lastTime = 0;

    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      canvas.width  = p.offsetWidth;
      canvas.height = p.offsetHeight;
      cols = new Array(Math.floor(canvas.width / FS)).fill(1);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      matrixReq.current = requestAnimationFrame(draw);
      if (!isVisible.current) return;
      if (time - lastTime < 40) return;
      lastTime = time;

      ctx.fillStyle = "rgba(0,0,0,.07)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = `${FS}px "IBM Plex Mono", monospace`;
      cols.forEach((y, i) => {
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, y * FS);
        if (y * FS > canvas.height && Math.random() > .975) cols[i] = 0;
        else cols[i]++;
      });
    };
    matrixReq.current = requestAnimationFrame(draw);

    return () => {
      if (matrixReq.current) cancelAnimationFrame(matrixReq.current);
      window.removeEventListener("resize", resize);
    };
  }, [matrixActive]);

  // Full-page dramatic flash
  useEffect(() => {
    if (!matrixFlash || !flashRef.current) return;
    const canvas = flashRef.current;
    const ctx    = canvas.getContext("2d");
    if (!ctx) return;
    const CHARS  = "ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコ0123456789@#$%^&*";
    const FS     = 16;
    let cols: number[] = [];
    let lastTime = 0;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = new Array(Math.floor(canvas.width / FS)).fill(1);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      flashReq.current = requestAnimationFrame(draw);
      if (time - lastTime < 30) return;
      lastTime = time;

      ctx.fillStyle = "rgba(0,0,0,.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font      = `${FS}px "IBM Plex Mono", monospace`;
      cols.forEach((y, i) => {
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, y * FS);
        if (y * FS > canvas.height && Math.random() > .975) cols[i] = 0;
        else cols[i]++;
      });
    };
    flashReq.current = requestAnimationFrame(draw);

    // Auto-dismiss after 4 s
    const dismiss = setTimeout(() => {
      setFlash(false);
      setMatrix(false);
      setHistory(p => [...p, { type: "out", text: "// Matrix exited. Welcome back." }]);
    }, 4000);

    return () => {
      if (flashReq.current) cancelAnimationFrame(flashReq.current);
      window.removeEventListener("resize", resize);
      clearTimeout(dismiss);
    };
  }, [matrixFlash]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") { setHistory([]); setMatrix(false); return; }

    setHistory(p => [...p, { type: "cmd", text: cmd }]);

    if (cmd === "matrix") {
      setHistory(p => [...p, { type: "out", text: "> Wake up, Neo..." }]);
      setTimeout(() => { setMatrix(true); setFlash(true); }, 600);
      return;
    }
    if (cmd === "github")   { setHistory(p => [...p, { type: "out", text: COMMANDS.github }]);   setTimeout(() => window.open("https://github.com/qwertyuii7", "_blank"), 800); return; }
    if (cmd === "leetcode") { setHistory(p => [...p, { type: "out", text: COMMANDS.leetcode }]); setTimeout(() => window.open("https://leetcode.com/u/chaudharymayank/", "_blank"), 800); return; }

    const res = COMMANDS[cmd];
    setHistory(p => [...p, { type: "out", text: res !== undefined ? res : `command not found: '${cmd}'. Try 'help'.` }]);
  };

  return (
    <section
      className="py-20 md:py-32 px-6 md:px-12 border-b"
      style={{ borderColor: "var(--border-primary)" }}
      id="terminal"
      ref={sectionRef}
    >
      <div className="section-label clip-reveal">001.5 — TERMINAL</div>

      {/* ── Matrix full-page flash ── */}
      {matrixFlash && (
        <div className="matrix-flash">
          <canvas ref={flashRef} className="matrix-flash-canvas" />
          <div className="matrix-flash-msg">
            <p>Wake up, Neo...</p>
            <p style={{ fontSize: ".7em", opacity: .6, marginTop: 8 }}>The Matrix has you. Follow the white rabbit. 🐇</p>
            <p style={{ fontSize: ".55em", opacity: .4, marginTop: 12, letterSpacing: ".2em" }}>// auto-closing in 4s</p>
          </div>
        </div>
      )}

      <div className={`terminal-shell reveal-item ${matrixActive ? "matrix-active" : ""}`}>
        {/* Subtle in-terminal matrix bg */}
        <canvas ref={canvasRef} id="matrix-canvas" />

        {/* Title bar */}
        <div className="terminal-titlebar">
          <span className="t-dot t-dot-red" />
          <span className="t-dot t-dot-yellow" />
          <span className="t-dot t-dot-green" />
          <span className="terminal-title">guest@mayank-portfolio: ~</span>
        </div>

        {/* Output */}
        <div
          className="terminal-output"
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className={`mt-1 ${line.type === "out" ? "text-[var(--text-muted)]" : "text-[var(--text-primary)]"}`}>
              {line.type === "cmd" && <span className="terminal-prompt-char mr-2">$</span>}
              {line.text.split("\n").map((l, j, arr) => (
                <span key={j}>{l}{j < arr.length - 1 && <br />}</span>
              ))}
            </div>
          ))}

          <div className="terminal-input-row mt-2">
            <span className="terminal-prompt-char">$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") { run(input); setInput(""); } }}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>

      <p className="font-mono text-xs text-[var(--text-muted)] mt-4 tracking-widest">
        TIP: type <span className="text-[var(--text-primary)]">matrix</span> for a surprise
      </p>
    </section>
  );
}
