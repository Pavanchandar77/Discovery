import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fetchDemoDashboard, uploadCandidatesAndRank } from "../api";
import { DashboardData } from "../types";

const steps = [
  "Parsing Candidates...",
  "Computing Fit...",
  "Computing Conviction...",
  "Computing Evidence Density...",
  "Calculating Talent Mispricing Index...",
  "Ranking Talent...",
  "Preparing Dashboard..."
];

interface Props {
  file: File | null;
  setData: (data: DashboardData) => void;
  onComplete: () => void;
}

export default function ProcessingScreen({ file, setData, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Stepper interval
    const stepTime = file ? 600 : 300; // faster for demo
    const interval = setInterval(() => {
      setCurrentStep(curr => {
        if (curr < steps.length - 1) return curr + 1;
        clearInterval(interval);
        return curr;
      });
    }, stepTime);
    
    // Fetch Data
    const fetchData = async () => {
      try {
        let result: DashboardData;
        if (file) {
           result = await uploadCandidatesAndRank(file);
        } else {
           result = await fetchDemoDashboard();
        }
        setData(result);
        
        // Ensure minimum artificial delay for UX and to let steps finish visually
        setTimeout(() => {
           onComplete();
        }, file ? 4200 : 2500); // 7 steps * 600ms = 4.2s for file

      } catch (e) {
        console.error(e);
      }
    };
    
    fetchData();

    return () => clearInterval(interval);
  }, [file, setData, onComplete]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full"></div>
      
      <div className="z-10 relative flex flex-col items-center w-full max-w-md">
        {/* Abstract Loader */}
        <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
            <motion.div
               animate={{ rotate: 360 }}
               transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
               className="absolute inset-0 rounded-full border border-indigo-500/30 border-t-indigo-500"
            />
            <motion.div
               animate={{ rotate: -360 }}
               transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
               className="absolute inset-4 rounded-full border border-cyan-500/30 border-b-cyan-500"
            />
            <div className="w-12 h-12 bg-white/10 rounded-full animate-pulse blur-sm" />
        </div>

        {/* Steps */}
        <div className="w-full space-y-4">
          {steps.map((step, idx) => {
            const isActive = idx === currentStep;
            const isDone = idx < currentStep;
            const isPending = idx > currentStep;

            return (
              <motion.div 
                key={step} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isPending ? 0 : 1, x: isPending ? -10 : 0 }}
                className="flex items-center gap-4"
              >
                <div className={`w-2 h-2 rounded-full ${isDone ? 'bg-cyan-400' : isActive ? 'bg-indigo-500 animate-pulse' : 'bg-slate-800'}`} />
                <span className={`text-sm ${isDone ? 'text-slate-400' : isActive ? 'text-white' : 'text-slate-600'}`}>
                   {step}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
