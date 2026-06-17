import { motion } from "motion/react";
import { fetchDemoDashboard } from "../api";
import { DashboardData } from "../types";
import { ArrowRight, Play, Database } from "lucide-react";

interface Props {
  onDemo: () => void;
  onUpload: () => void;
}

export default function LandingScreen({ onDemo, onUpload }: Props) {
  const handleDemo = async () => {
    // We navigate to PROCESSING immediately to show a loader, so we handle fetch there,
    // OR we fetch here and pass it. Actually, wait!
    // The App component expects us to set the data.
    // If we trigger `onDemo()`, we go to processing screen, but ProcessingScreen expects `data`.
    // It's better if the Loading/Processing screen handles the fetching.
    // Let's adjust: LandingScreen just says "Go to Processing for Demo". Wait.
    // Actually, `App.tsx` has:
    // {screen === 'PROCESSING' && <ProcessingScreen data={data} />}
    // `ProcessingScreen` just waits for an animation, then says "done"? Or does it do the fetch?
    // Let's do the fetch here, set it, and then move to processing.
    // Wait, `fetchDemoDashboard()` takes 1.2s. `uploadCandidates...` takes 3s.
    // That means we should fetch in `ProcessingScreen` or fetch here and show loading here.
    // Let's fetch here, set it, and `ProcessingScreen` just acts as a transition.
    
    // Actually, to make the "Processing" screen feel real, let's just transition to ProcessingScreen,
    // and let ProcessingScreen do the fetch.
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-black">
      {/* Background Orbs */}
      <div className="absolute top-0 inset-x-0 h-[500px] w-full" style={{ background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15), transparent 70%)' }}></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-6 text-center z-10"
      >
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-8 backdrop-blur-sm">
          <Database className="w-4 h-4 text-indigo-400" />
          <span className="text-sm text-slate-300 font-medium tracking-wide">Ledgera Intelligence OS</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-semibold tracking-tight text-white mb-6">
          Talent Market <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Intelligence</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover high-value candidates traditional ATS systems overlook.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onUpload}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Upload Candidate Dataset <ArrowRight className="w-4 h-4" />
          </button>
          
          <button 
            onClick={async () => {
              // Fire demo click right away for instant UX, Data fetch happens in ProcessingScreen
              onDemo();
            }}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4" /> View Live Demo
          </button>
        </div>
      </motion.div>
    </div>
  )
}
