import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardData } from '../../types';

export default function ComparisonSection({ data }: { data: DashboardData }) {
  const atsList = [...data.cards].sort((a,b) => a.ats_rank - b.ats_rank).slice(0, 8);
  const discList = [...data.cards].sort((a,b) => a.our_rank - b.our_rank).slice(0, 8);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getRankShift = (candidateId: string) => {
    const c = data.cards.find(x => x.candidate_id === candidateId);
    if (!c) return 0;
    return c.ats_rank - c.our_rank;
  };

  return (
    <section className="min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center">
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         className="mb-24 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">
          The Paradigm Shift
        </h2>
        <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
          Comparing the outputs of rigid legacy indexes against the Discovery intelligence engine.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
        {/* Connection divider */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

        {/* ATS Side */}
        <div className="relative">
           <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-8 pb-4 border-b border-white/5 pl-4">Legacy ATS Evaluation</div>
           <div className="space-y-3">
             {atsList.map((c, i) => (
               <div 
                 key={c.candidate_id}
                 onMouseEnter={() => setHoveredId(c.candidate_id)}
                 onMouseLeave={() => setHoveredId(null)}
                 className={`flex items-center gap-6 p-5 rounded-2xl transition-all duration-300 border border-transparent ${hoveredId === c.candidate_id ? 'bg-white/5 border-white/10' : hoveredId ? 'opacity-20' : 'hover:bg-white/[0.02]'}`}
               >
                 <div className="text-2xl font-light text-slate-600 w-8 tracking-tighter text-right">{i + 1}</div>
                 <div className="flex-1">
                   <div className="text-slate-300 font-medium">Candidate {c.candidate_id.split('_').pop()}</div>
                   <div className="text-xs text-slate-600 truncate mt-1 font-light">{c.title}</div>
                 </div>
                 <div className="text-right text-xs text-slate-600 font-mono">
                    #{c.ats_rank}
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Discovery Side */}
        <div className="relative">
           <div className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400 mb-8 pb-4 border-b border-white/5 pl-4">Discovery Engine Valuation</div>
           <div className="space-y-3">
             {discList.map((c, i) => {
               const shift = getRankShift(c.candidate_id);
               const isMassive = shift > 100;
               return (
               <div 
                 key={c.candidate_id}
                 onMouseEnter={() => setHoveredId(c.candidate_id)}
                 onMouseLeave={() => setHoveredId(null)}
                 className={`flex items-center gap-6 p-5 rounded-2xl transition-all duration-300 border ${hoveredId === c.candidate_id ? 'bg-cyan-950/20 border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.05)] scale-[1.02]' : hoveredId ? 'opacity-20 border-transparent' : 'border-transparent hover:bg-white/[0.02]'}`}
               >
                 <div className="text-2xl font-medium text-cyan-500 w-8 tracking-tighter text-right drop-shadow-sm">{i + 1}</div>
                 <div className="flex-1">
                   <div className="text-white font-medium">Candidate {c.candidate_id.split('_').pop()}</div>
                   <div className="text-xs text-cyan-400/60 truncate mt-1 font-light">High evidence density confirmed</div>
                 </div>
                 <div className="text-right">
                    <div className="text-sm font-medium text-white mb-1 font-mono">#{c.our_rank}</div>
                    <div className={`text-[10px] font-semibold tracking-wider ${isMassive ? 'text-cyan-400' : 'text-slate-500'}`}>
                       +{shift > 0 ? shift : 0} 
                    </div>
                 </div>
               </div>
             )})}
           </div>
        </div>
      </div>
    </section>
  )
}
