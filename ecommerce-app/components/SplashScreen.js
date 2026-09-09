"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem("splash_done");

    if (seen) return; // already shown → do nothing

    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("splash_done", "true");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex items-center justify-center z-[99999]">

      {/* Glow Background */}
      <div className="absolute w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full" />

      {/* Rotating Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[320px] h-[320px] rounded-full border border-cyan-400/40"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[380px] h-[380px] rounded-full border border-purple-500/20"
      />

      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <motion.h1
          animate={{
            textShadow: [
              "0 0 20px #22d3ee",
              "0 0 60px #22d3ee",
              "0 0 20px #22d3ee",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="text-7xl font-black tracking-[10px] text-white"
        >
          NEX
          <span className="text-cyan-400">ORA</span>
        </motion.h1>

        <p className="text-gray-400 mt-5 tracking-[6px] uppercase">
          Premium Shopping
        </p>

        {/* Loading Line */}
        <div className="w-80 h-[3px] bg-white/10 rounded-full mt-10 overflow-hidden mx-auto">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2.8,
            }}
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
          />
        </div>
      </motion.div>

      {/* Floating Dots */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
      <div className="absolute bottom-32 right-32 w-3 h-3 bg-purple-500 rounded-full animate-ping" />
      <div className="absolute top-40 right-40 w-2 h-2 bg-white rounded-full animate-pulse" />
    </div>
  );
}