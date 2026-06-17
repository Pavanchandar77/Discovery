import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';
import { DashboardData } from '../../types';

export default function TalentMapSection({ data }: { data: DashboardData }) {
  
  const chartData = useMemo(() => {
    return data.cards.map(c => ({
      x: c.ats_rank,
      y: c.our_rank,
      z: Math.max(10, c.tmi), // Size of dot, ensure not negative size
      name: c.candidate_id,
      role: c.title,
      fit: c.fit
    }))
  }, [data]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const pData = payload[0].payload;
      return (
        <div className="bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl">
          <p className="text-white font-medium mb-1 drop-shadow tracking-tight">Asset {pData.name.split('_').pop()}</p>
          <p className="text-slate-400 text-xs mb-4 font-light">{pData.role}</p>
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1 font-semibold">Market Valuation</span>
              <span className="text-slate-300 font-medium text-lg">#{pData.x}</span>
            </div>
            <div>
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest block mb-1 font-semibold">Discovery Valuation</span>
              <span className="text-white font-medium text-lg">#{pData.y}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center">
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         className="mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6">
          The Intelligence Grid
        </h2>
        <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
          Comparing exact traditional market scores against Discovery's valuation. The top left quadrant reveals extreme asymmetry.
        </p>
      </motion.div>

      <motion.div 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 1.5, delay: 0.2 }}
         className="w-full h-[600px] bg-white/[0.01] border border-white/5 rounded-3xl p-4 md:p-8 relative group shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-3xl" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="ATS Rank" 
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              reversed // So best rank is left
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Discovery Rank" 
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              reversed // So best rank is top
            />
            <ZAxis type="number" dataKey="z" range={[20, 200]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.05)' }} />
            <Scatter name="Candidates" data={chartData} isAnimationActive={false}>
              {chartData.map((entry, index) => {
                const isGem = entry.x - entry.y > 100;
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={isGem ? "#22d3ee" : "rgba(255,255,255,0.15)"} 
                    className={isGem ? "drop-shadow-[0_0_12px_rgba(34,211,238,0.6)] mix-blend-screen transition-all duration-300 hover:scale-[2] origin-center cursor-pointer" : "cursor-pointer hover:scale-[1.5] transition-all"}
                  />
                )
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </motion.div>
    </section>
  )
}
