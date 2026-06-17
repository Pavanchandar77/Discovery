import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
          The New Standard
        </h2>
        <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
          Comparing the rigid outputs of traditional keyword matching vs the Discovery intelligence engine.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
        {/* Connection divider */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

        {/* ATS Side */}
        <div className="relative">
           <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-8 pb-4 border-b border-white/5 pl-4">Standard ATS Top 8</div>
           <div className="space-y-2">
             {atsList.map((c, i) => (
               <div 
                 key={c.candidate_id}
                 onMouseEnter={() => setHoveredId(c.candidate_id)}
                 onMouseLeave={() => setHoveredId(null)}
                 className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${hoveredId === c.candidate_id ? 'bg-white/5 opacity-100' : hoveredId ? 'opacity-30' : 'hover:bg-white/[0.02]'}`}
               >
                 <div className="text-2xl font-light text-slate-600 w-8 tracking-tighter">{i + 1}</div>
                 <div className="flex-1">
                   <div className="text-white font-medium">Candidate {c.candidate_id.split('_').pop()}</div>
                   <div className="text-xs text-slate-500 truncate mt-1">{c.title}</div>
                 </div>
                 <div className="text-right text-xs text-slate-600">
                    ATS Rank: {c.ats_rank}
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Discovery Side */}
        <div className="relative">
           <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-8 pb-4 border-b border-white/5 pl-4">Discovery Engine Top 8</div>
           <div className="space-y-2">
             {discList.map((c, i) => {
               const shift = getRankShift(c.candidate_id);
               const isMassive = shift > 100;
               return (
               <div 
                 key={c.candidate_id}
                 onMouseEnter={() => setHoveredId(c.candidate_id)}
                 onMouseLeave={() => setHoveredId(null)}
                 className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${hoveredId === c.candidate_id ? 'bg-white/5 opacity-100 scale-[1.02]' : hoveredId ? 'opacity-30' : 'hover:bg-white/[0.02]'}`}
               >
                 <div className="text-2xl font-medium text-cyan-500 w-8 tracking-tighter">{i + 1}</div>
                 <div className="flex-1">
                   <div className="text-white font-medium">Candidate {c.candidate_id.split('_').pop()}</div>
                   <div className="text-xs text-cyan-400/50 truncate mt-1">{c.title}</div>
                 </div>
                 <div className="text-right">
                    <div className="text-xs font-medium text-white mb-1">Rank #{c.our_rank}</div>
                    <div className={`text-[10px] font-semibold tracking-wider uppercase ${isMassive ? 'text-cyan-400' : 'text-slate-500'}`}>
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
