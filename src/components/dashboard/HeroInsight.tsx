import { motion } from "motion/react";
import { DashboardData } from "../../types";
import { TrendingUp, AlertTriangle, Target, Briefcase, Zap, Activity } from "lucide-react";
import { cn } from "../../lib/utils";

export default function HeroInsight({ data }: { data: DashboardData }) {
  const { kpis, hero } = data;

  const kpiCards = [
    { label: "Market Efficiency", value: `${kpis.market_efficiency_pct}%`, icon: <TrendingUp className="w-5 h-5" />, color: "text-emerald-400" },
    { label: "Mispriced Talent", value: `${kpis.mispriced_pct}%`, icon: <AlertTriangle className="w-5 h-5" />, color: "text-rose-400" },
    { label: "Hidden Gems", value: kpis.hidden_gems, icon: <Zap className="w-5 h-5" />, color: "text-cyan-400" },
    { label: "Avg TMI", value: kpis.avg_tmi.toFixed(1), icon: <Activity className="w-5 h-5" />, color: "text-indigo-400" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
               <span className="text-sm font-medium text-slate-400">{kpi.label}</span>
               <div className={cn("p-2 rounded-lg bg-white/5", kpi.color)}>{kpi.icon}</div>
            </div>
            <div className="text-3xl font-semibold text-white">{kpi.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Hero Candidate Panel */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.98 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.3 }}
         className="relative rounded-3xl overflow-hidden border border-indigo-500/30 bg-gradient-to-b from-indigo-500/10 to-transparent"
      >
         <div className="absolute top-0 right-0 p-8 opacity-20"><Target className="w-64 h-64 text-indigo-400 blur-2xl" /></div>

         <div className="relative p-8 lg:p-12 z-10 flex flex-col lg:flex-row gap-12">
            
            {/* Left section */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium border border-indigo-500/30">
                <Zap className="w-4 h-4" /> Greatest Market Mispricing
              </div>

              <div>
                <h2 className="text-4xl font-semibold text-white mb-2">{hero.name}</h2>
                <div className="flex items-center gap-2 text-xl text-slate-400">
                  <Briefcase className="w-5 h-5" /> {hero.role}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                   <div className="text-sm text-slate-500 mb-1">Legacy ATS Rank</div>
                   <div className="text-3xl font-bold text-rose-400">#{hero.ats_rank}</div>
                </div>
                <div className="p-4 rounded-xl bg-indigo-900/20 border border-indigo-500/30">
                   <div className="text-sm text-indigo-300 mb-1">Ledgera Rank</div>
                   <div className="text-3xl font-bold text-indigo-400">#{hero.ledgera_rank}</div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                 <h3 className="text-sm font-semibold uppercase text-slate-500 tracking-wider">Intelligence Drivers</h3>
                 {hero.trust_drivers.map((driver, i) => (
                    <div key={i} className="flex gap-3 text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">
                      <div className="mt-0.5 text-emerald-400">•</div>
                      <p className="text-sm leading-relaxed">{driver}</p>
                    </div>
                 ))}
                 
                 <h3 className="text-sm font-semibold uppercase text-slate-500 tracking-wider pt-2">Why the ATS failed</h3>
                 {hero.concerns.map((concern, i) => (
                    <div key={i} className="flex gap-3 text-slate-400 bg-rose-500/5 p-3 rounded-lg border border-rose-500/10">
                      <div className="mt-0.5 text-rose-400">•</div>
                      <p className="text-sm leading-relaxed">{concern}</p>
                    </div>
                 ))}
              </div>
            </div>

            {/* Right section - Metrics */}
            <div className="w-full lg:w-80 flex flex-col gap-6">
                <MetricRing label="Talent Mispricing Index" value={hero.tmi} color="text-indigo-400" />
                <MetricBar label="Intelligence Fit" value={hero.fit} color="bg-emerald-500" />
                <MetricBar label="Model Conviction" value={hero.conviction} color="bg-cyan-500" />
                <MetricBar label="Evidence Density" value={hero.evidence_density} color="bg-indigo-500" />
            </div>

         </div>
      </motion.div>
    </div>
  )
}

function MetricRing({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col items-center justify-center text-center">
       <div className={cn("text-5xl font-bold mb-2 tracking-tighter", color)}>{value.toFixed(1)}</div>
       <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
  )
}

function MetricBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-200 font-medium">{value}%</span>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
         <motion.div 
           initial={{ width: 0 }}
           animate={{ width: `${value}%` }}
           transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
           className={cn("h-full rounded-full", color)} 
         />
      </div>
    </div>
  )
}
