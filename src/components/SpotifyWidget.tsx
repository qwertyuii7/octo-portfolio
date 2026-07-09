"use client";
import React, { useState, useEffect, useRef } from "react";

export function SpotifyWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(59);
  const [duration, setDuration] = useState(160);
  const [volume, setVolume] = useState(0.25);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof document !== "undefined") {
      const isDraft = document.documentElement.getAttribute("data-theme") === "draft" || localStorage.getItem("theme") === "draft";
      return isDraft ? "draft" : "night";
    }
    return "night";
  });

  const isDraft = theme === "draft";

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const userManuallyStopped = useRef(false);
  const hasStartedOnce = useRef(false);

  useEffect(() => {
    const updateTheme = () => {
      const isDraftTheme = document.documentElement.getAttribute("data-theme") === "draft" || localStorage.getItem("theme") === "draft";
      setTheme(isDraftTheme ? "draft" : "night");
    };
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("storage", updateTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", updateTheme);
    };
  }, []);

  useEffect(() => {
    const audio = new Audio("/assets/sunflower.mp3");
    audio.currentTime = 59; // Start after 59 seconds per user request
    audio.volume = 0.25;
    audio.loop = true;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current && audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    const EVENTS = ["click", "keydown", "pointerdown", "touchstart", "scroll", "mousemove", "wheel", "focus"];

    const tryPlay = async () => {
      if (userManuallyStopped.current || hasStartedOnce.current) return;
      try {
        if (audio.currentTime < 59) {
          audio.currentTime = 59;
        }
        await audio.play();
        hasStartedOnce.current = true;
        setIsPlaying(true);
        setHasInteracted(true);
        EVENTS.forEach(evt => window.removeEventListener(evt, handleFirstInteraction));
      } catch {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("canplay", tryPlay);
    tryPlay();

    const handleFirstInteraction = async () => {
      if (userManuallyStopped.current || hasStartedOnce.current) return;
      await tryPlay();
    };

    EVENTS.forEach(evt => window.addEventListener(evt, handleFirstInteraction, { passive: true }));

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("canplay", tryPlay);
      EVENTS.forEach(evt => window.removeEventListener(evt, handleFirstInteraction));
      audio.pause();
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      userManuallyStopped.current = true;
      hasStartedOnce.current = true;
      audioRef.current.pause();
    } else {
      userManuallyStopped.current = false;
      hasStartedOnce.current = true;
      if (!hasInteracted && audioRef.current.currentTime < 59) {
        audioRef.current.currentTime = 59;
      }
      audioRef.current.play().catch(() => {});
      setHasInteracted(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newVol = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setVolume(newVol);
    }
  };

  const formatTime = (timeInSec: number) => {
    if (isNaN(timeInSec)) return "0:59";
    const mins = Math.floor(timeInSec / 60);
    const secs = Math.floor(timeInSec % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    if (!isExpanded) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    const handleScroll = (e: Event) => {
      if (widgetRef.current && widgetRef.current.contains(e.target as Node)) return;
      setIsExpanded(false);
    };

    const timer = setTimeout(() => {
      window.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("touchstart", handleOutsideClick);
      window.addEventListener("scroll", handleScroll, { capture: true });
    }, 50);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("touchstart", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, [isExpanded]);

  return (
    <div ref={widgetRef} className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[9990] font-sans select-none pointer-events-auto">
      {/* ── COLLAPSED / PILL EDGE TAB ── */}
      {!isExpanded ? (
        <div
          onClick={() => setIsExpanded(true)}
          className={`group flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-full backdrop-blur-2xl border cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${
            isDraft
              ? "bg-[#F4F2EC]/95 border-[#D1CFC8] hover:border-[#1aa34a] shadow-[0_10px_30px_rgba(26,26,26,0.15)] text-[#1A1A1A]"
              : "bg-[#11131a]/95 border-white/15 hover:border-[#1ED760]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-white"
          }`}
          title="Click to open Spotify Player"
        >
          {/* Spotify Green Icon */}
          <div className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0 ${
            isDraft ? "bg-[#1aa34a]/15" : "bg-[#1ED760]/10"
          }`}>
            <svg
              className={`w-4 h-4 sm:w-5 sm:h-5 ${isDraft ? "text-[#1aa34a]" : "text-[#1ED760]"}`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-.96 15.72 1.68.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.24z" />
            </svg>
            {isPlaying && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#1ED760] animate-pulse" />
            )}
          </div>

          {/* Mini Cover Photo */}
          <img
            src="/assets/intro-import.jpg"
            alt="Sunflower Cover"
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border shrink-0 ${
              isDraft ? "border-black/15" : "border-white/20"
            } ${isPlaying ? "animate-[spin_10s_linear_infinite]" : ""}`}
            draggable={false}
          />

          {/* Song Info (Hidden on smaller devices, visible on sm and above) */}
          <div className="hidden sm:flex flex-col justify-center text-left max-w-[150px]">
            <span className={`text-xs font-semibold truncate leading-tight ${isDraft ? "text-[#1A1A1A]" : "text-white"}`}>
              Sunflower
            </span>
            <span className={`text-[10px] truncate leading-tight ${isDraft ? "text-[#555555]" : "text-gray-400"}`}>
              Post Malone, Swae Lee
            </span>
          </div>

          {/* Equalizer bars or Play icon */}
          <button
            onClick={togglePlay}
            className={`ml-0 sm:ml-2 w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
              isDraft
                ? "bg-black/10 hover:bg-[#1aa34a] text-[#1A1A1A] hover:text-white"
                : "bg-white/10 hover:bg-[#1ED760] text-white hover:text-black"
            }`}
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      ) : (
        /* ── EXPANDED RECTANGLE SPOTIFY CARD ── */
        <div className={`w-[290px] sm:w-[340px] max-w-[calc(100vw-32px)] backdrop-blur-3xl border rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 transition-all animate-in fade-in zoom-in-95 duration-200 ${
          isDraft
            ? "bg-[#F4F2EC]/95 border-[#D1CFC8] shadow-[0_25px_60px_-10px_rgba(26,26,26,0.18)] text-[#1A1A1A]"
            : "bg-[#101218]/95 border-white/15 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95)] text-white"
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between pb-1 border-b ${isDraft ? "border-black/10" : "border-white/10"}`}>
            <div className="flex items-center gap-2">
              <svg
                className={`w-4 h-4 sm:w-5 sm:h-5 ${isDraft ? "text-[#1aa34a]" : "text-[#1ED760]"}`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-.96 15.72 1.68.54.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.24z" />
              </svg>
              <span className={`text-[11px] sm:text-xs font-semibold tracking-wider uppercase ${isDraft ? "text-[#555555]" : "text-gray-300"}`}>
                Spotify BG Player
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors text-sm ${
                isDraft
                  ? "bg-black/5 hover:bg-black/15 text-[#555555] hover:text-[#1A1A1A]"
                  : "bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white"
              }`}
              title="Minimize"
            >
              —
            </button>
          </div>

          {/* Track Info & Cover */}
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <img
                src="/assets/intro-import.jpg"
                alt="Sunflower Cover Photo"
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shadow-lg border ${
                  isDraft ? "border-black/15" : "border-white/15"
                }`}
                draggable={false}
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#1ED760] animate-ping" />
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className={`text-sm sm:text-base font-bold truncate ${isDraft ? "text-[#1A1A1A]" : "text-white"}`}>
                Sunflower
              </span>
              <span className={`text-xs truncate mt-0.5 ${isDraft ? "text-[#555555]" : "text-gray-400"}`}>
                Post Malone, Swae Lee
              </span>
              <span className={`text-[10px] font-mono mt-1 flex items-center gap-1.5 ${isDraft ? "text-[#1aa34a]" : "text-[#1ED760]"}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1ED760] inline-block animate-pulse" />
                Spider-Man: Into the Spider-Verse
              </span>
            </div>
          </div>

          {/* Scrubber Progress Bar */}
          <div className="flex flex-col gap-1 mt-1">
            <input
              type="range"
              min={0}
              max={duration || 160}
              value={currentTime}
              onChange={handleSeek}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer focus:outline-none hover:h-2 transition-all ${
                isDraft ? "bg-black/15 accent-[#1aa34a]" : "bg-white/15 accent-[#1ED760]"
              }`}
            />
            <div className={`flex items-center justify-between text-[10px] font-mono ${isDraft ? "text-[#555555]" : "text-gray-400"}`}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls & Volume */}
          <div className="flex items-center justify-between pt-1">
            {/* Volume Control */}
            <div className="flex items-center gap-2 w-28">
              <svg className={`w-4 h-4 shrink-0 ${isDraft ? "text-[#555555]" : "text-gray-400"}`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${
                  isDraft ? "bg-black/15 accent-[#1aa34a]" : "bg-white/15 accent-[#1ED760]"
                }`}
                title="Adjust Volume"
              />
            </div>

            {/* Play / Pause / Rewind buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors text-xs ${
                  isDraft ? "bg-black/5 hover:bg-black/15 text-[#333333]" : "bg-white/5 hover:bg-white/15 text-gray-300"
                }`}
                title="Rewind 10s"
              >
                -10s
              </button>
              <button
                onClick={togglePlay}
                className={`w-10 h-10 rounded-full text-black flex items-center justify-center shadow-lg transition-transform active:scale-95 shrink-0 ${
                  isDraft ? "bg-[#1aa34a] hover:bg-[#168a3b] text-white" : "bg-[#1ED760] hover:bg-[#1fec69] text-black"
                }`}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => {
                  if (audioRef.current) audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors text-xs ${
                  isDraft ? "bg-black/5 hover:bg-black/15 text-[#333333]" : "bg-white/5 hover:bg-white/15 text-gray-300"
                }`}
                title="Forward 10s"
              >
                +10s
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
