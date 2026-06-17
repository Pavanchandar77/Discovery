import { motion } from "motion/react";
import { DashboardData } from "../../types";
import { Sparkles, TrendingUp, ShieldAlert, Award } from "lucide-react";

export default function HiddenGems({ data }: { data: DashboardData }) {
  // Filter for gems: high TMI (significantly undervalued by ATS) and high fit
  const gems = data.cards
    .filter(c => c.tmi > 30 && c.fit > 85)
    .sort((a, b) => b.tmi - a.tmi)
    .slice(0, 6);

  if (gems.length === 0) {
    // Fallback if current mock randomizer didn't hit
    gems.push(data.hero);
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-2 flex items-center gap-2">
           <Sparkles className="w-6 h-6 text-cyan-400" /> Hidden Gems
        </h2>
        <p className="text-slate-400">High-conviction candidates systematically overlooked by legacy filtering rules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {gems.map((gem, i) => (
           <motion.div 
             key={gem.id}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-colors rounded-2xl p-6 flex flex-col"
           >
              <div className="flex justify-between items-start mb-4">
                 <div>
                   <h3 className="text-lg font-semibold text-white">{gem.name}</h3>
                   <p className="text-sm text-cyan-400">{gem.role}</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold border border-cyan-500/20">
                    {gem.fit}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                 <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-xs text-slate-500 mb-1">ATS Rank</div>
                    <div className="text-xl font-semibold text-slate-300">#{gem.ats_rank}</div>
                 </div>
                 <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/10">
                    <div className="text-xs text-cyan-500/70 mb-1">TMI Score</div>
                    <div className="text-xl font-semibold text-cyan-400 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> {gem.tmi.toFixed(0)}
                    </div>
                 </div>
              </div>

              <div className="flex-1 space-y-4">
                 <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-2">
                       <Award className="w-3.5 h-3.5" /> Intelligence Drivers
                    </div>
                    <ul className="text-sm text-slate-300 space-y-1.5">
                       {gem.trust_drivers.length > 0 ? gem.trust_drivers.map((td, idx) => (
                         <li key={idx} className="flex gap-2"><span className="text-emerald-500/50">•</span> <span className="line-clamp-2">{td}</span></li>
                       )) : <li className="text-slate-500 italic">No specific external drivers logged.</li>}
                    </ul>
                 </div>
                 
                 <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400/80 mb-2">
                       <ShieldAlert className="w-3.5 h-3.5" /> ATS Penalty Cause
                    </div>
                    <ul className="text-sm text-slate-400 space-y-1.5">
                       {gem.concerns.length > 0 ? gem.concerns.map((c, idx) => (
                         <li key={idx} className="flex gap-2"><span className="text-rose-400/50">•</span> <span className="line-clamp-2">{c}</span></li>
                       )) : <li className="text-slate-500 italic">Unknown penalty cause.</li>}
                    </ul>
                 </div>
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  )
}
