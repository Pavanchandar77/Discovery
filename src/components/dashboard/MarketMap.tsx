import { useState, useMemo } from "react";
import { DashboardData, Candidate } from "../../types";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, Cell } from "recharts";

export default function MarketMap({ data }: { data: DashboardData }) {
  const [selected, setSelected] = useState<Candidate | null>(null);

  // Recharts needs an array of objects
  const plotData = useMemo(() => {
    return data.cards.map(c => ({
      ...c,
      x: c.fit,
      y: c.conviction,
      z: c.evidence_density, // affects size
      colorRank: c.tmi > 30 ? '#22d3ee' : c.tmi < -30 ? '#f43f5e' : '#6366f1' // cyan, rose, indigo
    }));
  }, [data.cards]);

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-2">Talent Market Map</h2>
        <div className="flex gap-4 text-sm">
           <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-cyan-400"></div> Undervalued (High TMI)</div>
           <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-rose-400"></div> Overvalued (Low TMI)</div>
           <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-indigo-400"></div> Efficient Pricing</div>
        </div>
      </div>

      <div className="flex-1 min-h-[500px] flex gap-6">
         {/* Chart Area */}
         <div className="flex-1 bg-slate-900/30 rounded-2xl border border-white/5 p-6">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis type="number" dataKey="x" name="Fit Score" unit="%" stroke="#94a3b8" domain={[0, 100]} />
                <YAxis type="number" dataKey="y" name="Conviction" unit="%" stroke="#94a3b8" domain={[0, 100]} />
                <ZAxis type="number" dataKey="z" range={[50, 400]} name="Evidence" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3', stroke: '#475569' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const c = payload[0].payload;
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl shadow-black/50 text-sm">
                          <p className="font-semibold text-white">{c.name}</p>
                          <p className="text-slate-400 mb-2">{c.role}</p>
                          <div className="space-y-1">
                            <p className="text-slate-300">Fit: <span className="text-white font-medium">{c.fit}%</span></p>
                            <p className="text-slate-300">Conviction: <span className="text-white font-medium">{c.conviction}%</span></p>
                            <p className="text-slate-300">TMI: <span className="text-white font-medium">{c.tmi.toFixed(1)}</span></p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  name="Candidates" 
                  data={plotData} 
                  onClick={(e) => setSelected(e.payload)}
                  shape="circle"
                >
                  {plotData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.colorRank} opacity={0.6} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
         </div>

         {/* Selection Detail Panel */}
         <div className="w-80 bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col">
            {selected ? (
              <div className="animate-in fade-in space-y-6">
                 <div>
                   <h3 className="text-xl font-semibold text-white">{selected.name}</h3>
                   <p className="text-sm text-slate-400">{selected.role}</p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3">
                   <div className="p-3 bg-black/30 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">ATS Rank</div>
                      <div className="text-lg font-semibold text-white">#{selected.ats_rank}</div>
                   </div>
                   <div className="p-3 bg-black/30 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">Our Rank</div>
                      <div className="text-lg font-semibold text-indigo-400">#{selected.ledgera_rank}</div>
                   </div>
                 </div>

                 <div className="space-y-3">
                   <MetricRow label="Fit" value={selected.fit} />
                   <MetricRow label="Conviction" value={selected.conviction} />
                   <MetricRow label="Evidence Density" value={selected.evidence_density} />
                   <MetricRow label="TMI" value={selected.tmi} isTmi />
                 </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 gap-2">
                 <div className="w-12 h-12 rounded-full border border-dashed border-slate-600 flex items-center justify-center mb-2">
                    <span className="text-xl">↖</span>
                 </div>
                 <p>Click a node on the market map to inspect candidate intelligence.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  )
}

function MetricRow({ label, value, isTmi }: { label: string, value: number, isTmi?: boolean }) {
  return (
    <div className="flex justify-between items-center text-sm">
       <span className="text-slate-400">{label}</span>
       <span className={`font-medium ${isTmi ? (value > 0 ? 'text-cyan-400' : 'text-rose-400') : 'text-slate-200'}`}>
         {isTmi && value > 0 ? '+' : ''}{typeof value === 'number' && !isTmi ? `${value}%` : value.toFixed(1)}
       </span>
    </div>
  )
}
