import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Changed to framer-motion directly for simplicity or keep motion/react
import { Upload, Play, Sparkles } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
  onDemo: () => void;
  onUpload: (file: File) => void;
}

export default function LandingScreen({ onDemo, onUpload }: Props) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const f = e.dataTransfer.files[0];
      if (f.name.endsWith('.zip') || f.name.endsWith('.jsonl')) {
         onUpload(f);
      } else {
         alert("Please upload a .zip or .jsonl file");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden font-sans">
      
      {/* Cinematic animated background */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-[#101015] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full"
          style={{ background: 'conic-gradient(from 0deg, transparent 0 340deg, #ffffff 360deg)' }} 
        />
      </div>

      <div className="z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">
        
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-widest uppercase text-slate-300">
            <Sparkles className="w-3 h-3 text-white" /> Inside Discovery
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-6xl md:text-8xl font-medium tracking-tighter text-white mb-6 leading-none"
        >
          57% of top talent<br />
          <span className="text-slate-500">is hidden.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light tracking-wide mb-16"
        >
          Traditional ATS systems optimize for keywords. <br className="hidden md:block" />
          <span className="text-slate-200 font-normal">Discovery identifies actual potential.</span>
        </motion.p>


        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
           className="w-full max-w-lg relative group"
        >
          {/* Upload Area */}
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              "relative rounded-2xl border flex flex-col items-center justify-center p-12 transition-all duration-500 backdrop-blur-md overflow-hidden",
              dragActive 
                ? "border-white bg-white/5 scale-[1.02]" 
                : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
            )}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <Upload className={cn("w-8 h-8 mb-4 transition-colors duration-500", dragActive ? "text-white" : "text-slate-400")} />
            
            <p className="text-lg font-medium text-white mb-2">Drag Candidate ZIP</p>
            <p className="text-sm text-slate-500 mb-6 font-light">or click to browse local files</p>
            
            <label className="relative z-10 px-6 py-2.5 bg-white text-black font-medium text-sm rounded-full cursor-pointer hover:scale-105 transition-transform duration-300">
               Select File
               <input 
                 type="file" 
                 className="hidden" 
                 accept=".zip,.jsonl" 
                 onChange={(e) => {
                   if (e.target.files?.[0]) onUpload(e.target.files[0]);
                 }} 
               />
            </label>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="mt-12"
        >
          <button 
            onClick={onDemo}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors duration-300"
          >
            <Play className="w-3.5 h-3.5" /> 
            <span>Experience interactive demo</span>
          </button>
        </motion.div>

      </div>
    </div>
  );
}
