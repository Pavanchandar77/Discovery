import React from 'react';
import { motion } from 'framer-motion';
import { DashboardData } from '../../types';

export default function HiddenGemsSection({ data }: { data: DashboardData }) {
  const gems = [...data.cards]
    .sort((a, b) => b.tmi - a.tmi)
    .slice(0, 4);

  return (
    <section className="min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center">
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         className="mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">
          High Conviction Discoveries
        </h2>
        <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
          The top candidates who possess extraordinary evidence density but were bypassed due to superficial keyword mismatches.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gems.map((gem, i) => (
          <motion.div
            key={gem.candidate_id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-black/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] hover:border-white/10 transition-all duration-500 hover:-translate-y-1 shadow-2xl"
          >
             <div className="absolute top-0 right-0 p-8">
               <div className="text-right">
                 <div className="text-[10px] uppercase font-semibold tracking-widest text-slate-500 mb-1">Evidence Mix</div>
                 <div className="text-2xl font-medium tracking-tighter text-cyan-400">{gem.tmi}x</div>
               </div>
             </div>

             <div className="mb-8">
                <div className="text-xs uppercase font-semibold tracking-widest text-slate-600 mb-3 block">Opportunity</div>
                <h3 className="text-2xl font-medium text-white tracking-tight mb-2">Candidate {gem.candidate_id.split('_').pop()}</h3>
                <p className="text-sm text-slate-400 font-light">{gem.title}</p>
             </div>

             <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-white/5">
                <div>
                   <div className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-2 block">ATS Market Rank</div>
                   <div className="text-3xl font-light text-slate-500 strike line-through decoration-white/10 tracking-tighter">#{gem.ats_rank}</div>
                </div>
                <div>
                   <div className="text-[10px] uppercase tracking-widest text-white/50 font-semibold mb-2 block">Discovery Rank</div>
                   <div className="text-3xl font-medium text-white tracking-tighter">#{gem.our_rank}</div>
                </div>
             </div>

             <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div>
                  <div className="text-[10px] uppercase font-semibold tracking-widest text-cyan-400/70 mb-3 block">Core Conviction Drivers</div>
                  <ul className="space-y-3">
                    {gem.trust_drivers.slice(0, 3).map((driver, idx) => (
                      <li key={idx} className="flex gap-3 text-sm font-light text-slate-300 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{driver}</span>
                      </li>
                    ))}
                    {gem.trust_drivers.length === 0 && <span className="text-slate-500 text-xs text-light italic">None provided.</span>}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold tracking-widest text-rose-400/70 mb-3 block">Algorithmic Concerns</div>
                  <ul className="space-y-3">
                    {gem.concerns.slice(0, 2).map((concern, idx) => (
                      <li key={idx} className="flex gap-3 text-sm font-light text-slate-400 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400/50 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{concern}</span>
                      </li>
                    ))}
                    {gem.concerns.length === 0 && <span className="text-slate-500 text-xs text-light italic">No critical concerns.</span>}
                  </ul>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
