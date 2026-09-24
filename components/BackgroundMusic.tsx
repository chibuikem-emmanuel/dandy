"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // High-quality direct CDN stream for Johnny Drille - Believe Me
  const SONG_URL =
    "/audio/believe-me.mp3";

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((err) => console.log("Audio playback blocked:", err));
    }
  };

  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasStarted && audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasStarted(true);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("click", handleFirstClick, { once: true });
    return () => window.removeEventListener("click", handleFirstClick);
  }, [hasStarted]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src={SONG_URL} loop preload="auto" />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="flex items-center gap-3 bg-[#4A121A] text-[#F5F0EB] border border-[#C2A675]/40 px-4 py-3 rounded-full shadow-lg backdrop-blur-md hover:bg-[#330c12] transition-all cursor-pointer"
        aria-label="Toggle background music"
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <Volume2 size={18} className="text-[#C2A675] animate-pulse" />
          ) : (
            <VolumeX size={18} className="text-[#F5F0EB]/60" />
          )}
        </div>

        <span className="text-[11px] font-semibold uppercase tracking-widest hidden sm:inline-block pr-1">
          {isPlaying ? "Johnny Drille — Believe Me" : "Play Music"}
        </span>

        {isPlaying && (
          <div className="flex items-end gap-[2px] h-3 ml-1">
            <span className="w-[2px] bg-[#C2A675] h-full animate-[bounce_1s_infinite_100ms]" />
            <span className="w-[2px] bg-[#C2A675] h-full animate-[bounce_1s_infinite_300ms]" />
            <span className="w-[2px] bg-[#C2A675] h-full animate-[bounce_1s_infinite_200ms]" />
          </div>
        )}
      </motion.button>
    </div>
  );
}