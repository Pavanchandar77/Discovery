import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchDemoDashboard, uploadCandidatesAndRank } from "../api";
import { DashboardData } from "../types";

const STEPS = [
  "Scanning Candidate Pool...",
  "Analyzing Experience Signals...",
  "Measuring Evidence Density...",
  "Detecting Talent Mispricing...",
  "Computing Conviction...",
  "Ranking Candidates..."
];

interface Props {
  file: File | null;
  setData: (data: DashboardData) => void;
  onComplete: () => void;
}

export default function ProcessingScreen({ file, setData, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Determine pacing
    // we want the full sequence to take about 4-5 seconds
    const interval = setInterval(() => {
      setCurrentStep(curr => {
        if (curr < STEPS.length - 1) return curr + 1;
        clearInterval(interval);
        return curr;
      });
    }, 700);
    
    const fetchData = async () => {
      try {
        let result: DashboardData;
        if (file) {
           result = await uploadCandidatesAndRank(file);
        } else {
           result = await fetchDemoDashboard();
        }
        setData(result);
        
        // Ensure minimum delay
        setTimeout(() => {
           onComplete();
        }, 5000); 

      } catch (e) {
        console.error(e);
      }
    };
    
    fetchData();

    return () => clearInterval(interval);
  }, [file, setData, onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <AnimatePresence mode="wait">
        <motion.div
           key={currentStep}
           initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
           animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
           exit={{ opacity: 0, filter: "blur(10px)", y: -10 }}
           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
           className="text-2xl md:text-4xl text-white font-light tracking-wide text-center px-6"
        >
          {STEPS[currentStep]}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
         {STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                i === currentStep ? "bg-white scale-125" : 
                i < currentStep ? "bg-white/30" : "bg-white/10"
              }`} 
            />
         ))}
      </div>
    </div>
  );
}
