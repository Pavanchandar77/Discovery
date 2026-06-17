import { motion } from "motion/react";
import { DashboardData, Candidate } from "../../types";
import { ArrowRight, ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "../../lib/utils";

export default function AtsComparison({ data }: { data: DashboardData }) {
  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-2">Legacy ATS vs Ledgera</h2>
        <p className="text-slate-400">Comparing top 10 rankings. Notice how traditional systems penalize high-value talent due to rigid keyword matching.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
         {/* ATS Side */}
         <div className="space-y-4">
           <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-medium text-slate-300">Legacy ATS Top 10</h3>
           </div>
           <div className="space-y-3">
             {data.ats_top10.map((cand, i) => (
               <CandidateRow key={cand.id} candidate={cand} rank={i + 1} type="ats" />
             ))}
           </div>
         </div>

         {/* Ledgera Side */}
         <div className="space-y-4">
           <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-medium text-indigo-400 flex items-center gap-2">
                Ledgera Top 10
              </h3>
           </div>
           <div className="space-y-3">
             {data.our_top10.map((cand, i) => (
               <CandidateRow key={cand.id} candidate={cand} rank={i + 1} type="ledgera" />
             ))}
           </div>
         </div>
      </div>
    </div>
  )
}

function CandidateRow({ candidate, rank, type }: { candidate: Candidate, rank: number, type: 'ats' | 'ledgera' }) {
  const isMispriced = type === 'ledgera' && candidate.tmi > 20;
  const isOvervalued = type === 'ats' && candidate.tmi < -20;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex items-center justify-between p-4 rounded-xl border transition-colors",
        type === 'ats' ? "bg-slate-900/40 border-slate-800" : "bg-indigo-900/10 border-indigo-500/20",
        isMispriced && "border-indigo-500/50 bg-indigo-500/10",
        isOvervalued && "border-rose-500/30 bg-rose-500/5",
      )}
    >
      <div className="flex items-center gap-4">
         <div className={cn(
           "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
           type === 'ats' ? "bg-slate-800 text-slate-400" : "bg-indigo-500/20 text-indigo-400"
         )}>
           {rank}
         </div>
         <div>
            <div className="font-medium text-slate-200">{candidate.name}</div>
            <div className="text-xs text-slate-500">{candidate.role}</div>
         </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
         {type === 'ledgera' && (
           <div className="flex flex-col items-end">
             {candidate.ats_rank > 10 ? (
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                  <ArrowUp className="w-3 h-3" /> {candidate.ats_rank - candidate.ledgera_rank} positions
                </div>
             ) : (
                <div className="text-xs text-slate-500">Agrees with ATS</div>
             )}
             <div className="text-xs text-slate-500">from ATS #{candidate.ats_rank}</div>
           </div>
         )}
         
         {type === 'ats' && (
           <div className="flex flex-col items-end">
             {candidate.ledgera_rank > 10 ? (
                <div className="flex items-center gap-1 text-rose-400 text-xs font-medium">
                  <ArrowDown className="w-3 h-3" /> Dropped
                </div>
             ) : (
                <div className="text-xs text-slate-500">Agrees with Ledgera</div>
             )}
             <div className="text-xs text-slate-500">Our rank #{candidate.ledgera_rank}</div>
           </div>
         )}
      </div>
    </motion.div>
  )
}
