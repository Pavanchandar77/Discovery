import React from 'react';
import { motion } from 'framer-motion';
import { DashboardData } from '../../types';

export default function InsightsSection({ data }: { data: DashboardData }) {
  const avgTmi = data.avg_tmi.toFixed(1);
  const highestTmi = data.highest_tmi.toFixed(1);

  return (
    <section className="min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center">
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         className="mb-24"
      >
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">
          The Anatomy of the Pool
        </h2>
        <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
          The discrepancy between keyword matching and true evidence density across {data.n_candidates} processed resumes.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="md:col-span-8 bg-white/[0.02] border border-white/5 rounded-3xl p-10 md:p-16 flex flex-col justify-between overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          <div className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4 z-10">Talent Mispricing</div>
          <div className="text-6xl md:text-8xl font-medium tracking-tighter text-white mb-4 z-10">{data.mispriced_pct}%</div>
          <p className="text-lg text-slate-400 max-w-md font-light z-10">
             Over half the talent pool is fundamentally mispriced by standard ATS keyword rankers.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="md:col-span-4 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between"
        >
          <div className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">Hidden Gems</div>
          <div className="text-6xl md:text-7xl font-medium tracking-tighter text-white mb-4">{data.hidden_gems}</div>
          <p className="text-base text-slate-400 font-light">
             High-conviction outliers buried deep in the queue.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="md:col-span-4 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between"
        >
           <div className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">Avg TMI</div>
           <div className="text-5xl md:text-6xl font-medium tracking-tighter text-white mb-4">{avgTmi}x</div>
           <p className="text-base text-slate-400 font-light">
              Average Talent Mispricing Index across the pool.
           </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="md:col-span-4 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-white/5 to-transparent"
        >
           <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">Market Efficiency</div>
           <div className="text-5xl md:text-6xl font-medium tracking-tighter text-white mb-4">{data.market_efficiency_pct}%</div>
           <p className="text-base text-slate-400 font-light">
              Overlap between traditional ATS and Discovery.
           </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="md:col-span-4 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-between"
        >
           <div className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">Highest TMI</div>
           <div className="text-5xl md:text-6xl font-medium tracking-tighter text-white mb-4">{highestTmi}x</div>
           <p className="text-base text-slate-400 font-light">
              Maximum discrepancy recorded.
           </p>
        </motion.div>

      </div>
    </section>
  )
}
