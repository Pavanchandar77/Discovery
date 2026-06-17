import React from 'react';
import { motion } from 'framer-motion';
import { Candidate } from '../../types';

export default function RevealSection({ hero }: { hero?: Candidate }) {
  if (!hero) return null;
  const improvement = hero.ats_rank - hero.our_rank;

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#101015] via-[#050505] to-[#050505] pointer-events-none" />
       
       <div className="z-10 w-full max-w-5xl flex flex-col items-center">
         <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
         >
           <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white mb-4">
             ATS missed this candidate.
           </h2>
           <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide max-w-2xl mx-auto">
             A stark example of market inefficiency. Keywords hide true potential.
           </p>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full relative group"
         >
           {/* Abstract minimal glow */}
           <div className="absolute -inset-0.5 bg-gradient-to-br from-white/20 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl pointer-events-none" />
           
           <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row gap-12 md:gap-24 overflow-hidden shadow-2xl">
             
             {/* Abstract Avatar Placeholder */}
             <div className="hidden md:flex relative shrink-0 items-center justify-center w-56 h-56 rounded-full border border-white/10 bg-white/[0.01]">
                <div className="text-4xl font-light text-white/50 tracking-tighter text-center">{hero.candidate_id.split('_').pop()}</div>
                <svg className="absolute inset-0 w-full h-full -rotate-90 text-white/5" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" />
                </svg>
             </div>

             <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                <div className="uppercase tracking-widest text-xs font-semibold text-white/50 mb-3">Highest Conviction Outlier</div>
                <h3 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-2">Candidate {hero.candidate_id.split('_').pop()}</h3>
                <p className="text-xl text-slate-400 font-light mb-12">{hero.title}</p>

                <div className="grid grid-cols-2 gap-8 w-full border-t border-white/5 pt-8">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-slate-600 font-semibold mb-3">ATS Rank</div>
                    <div className="text-4xl md:text-5xl text-slate-500 font-light strike tracking-tighter line-through decoration-white/10">#{hero.ats_rank}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/70 font-semibold mb-3">Discovery Rank</div>
                    <div className="text-5xl md:text-6xl text-white font-medium tracking-tighter">#{hero.our_rank}</div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="px-6 py-2 bg-white text-black text-sm font-semibold rounded-full inline-flex md:mr-auto justify-center">
                    +{improvement} Rank Improvement
                  </div>
                  <div className="text-sm font-light text-slate-500 max-w-xs text-left">
                     Evidence density exceeded expected baseline by {Math.round(hero.tmi * 10) / 10}x.
                  </div>
                </div>
             </div>
           </div>
         </motion.div>
       </div>
    </section>
  )
}
