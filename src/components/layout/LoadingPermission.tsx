"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Fingerprint } from "lucide-react";

/**
 * LoadingPermission - In-Page Version
 * Didesain untuk duduk di dalam container/halaman (bukan full screen).
 */
export default function LoadingPermission() {
  const uclcPurple = "#6C5DD3";

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm">
      
      {/* 1. Subtle Background Grid - Dibatasi hanya dalam container */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ 
             backgroundImage: `linear-gradient(${uclcPurple} 1px, transparent 1px), linear-gradient(to right, ${uclcPurple} 1px, transparent 1px)`,
             backgroundSize: "40px 40px"
           }} 
      />
      
      {/* 2. central Soft Glow */}
      <div className="absolute w-64 h-64 bg-[#6C5DD3]/10 rounded-full blur-[80px] opacity-50" />

      <div className="relative flex flex-col items-center">
        
        {/* 3. Central Unit */}
        <div className="relative flex items-center justify-center w-28 h-28">
          
          {/* Animated Ring SVG */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <motion.circle
              cx="56"
              cy="56"
              r="52"
              stroke={uclcPurple}
              strokeWidth="1.5"
              fill="transparent"
              strokeDasharray="80 160"
              animate={{ strokeDashoffset: [0, -240] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="opacity-40"
            />
          </svg>

          {/* Pulsing Security Icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShieldCheck size={36} className="text-[#6C5DD3]" />
          </motion.div>
        </div>

        {/* 4. Minimalist Text Section */}
        <div className="mt-8 flex flex-col items-center text-center">
          <h3 className="text-[10px] font-black text-slate-800 dark:text-white tracking-[0.5em] uppercase mb-4">
            Securing Access
          </h3>

          {/* Thin Linear Progress */}
          <div className="w-32 h-[1px] bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1/2 h-full bg-[#6C5DD3]"
            />
          </div>

          <motion.div 
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 text-[8px] font-mono text-slate-400 uppercase tracking-widest"
          >
            <Fingerprint size={10} />
            <span>Encrypted Token Verified</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}