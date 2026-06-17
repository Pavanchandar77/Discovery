import { useState, useMemo } from "react";
import { DashboardData, Candidate } from "../../types";
import { Search, ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "motion/react";

type SortKey = keyof Candidate;
type SortOrder = 'asc' | 'desc';

export default function CandidateExplorer({ data }: { data: DashboardData }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>('ledgera_rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder(key === 'ledgera_rank' || key === 'ats_rank' ? 'asc' : 'desc');
    }
  };

  const filteredData = useMemo(() => {
    return data.cards.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.role.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });
  }, [data.cards, search, sortKey, sortOrder]);

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col max-w-7xl mx-auto relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">Candidate Explorer</h2>
          <p className="text-slate-400">Deep-dive into the processed intelligence dataset.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search candidates..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-64 pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 focus:border-indigo-500 outline-none rounded-lg text-sm transition-colors text-white"
              />
           </div>
           <button className="p-2 border border-slate-700 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
           </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
         {/* Table Header */}
         <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-black/40 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <div className="col-span-3 cursor-pointer flex items-center gap-1 hover:text-white" onClick={() => handleSort('name')}>
              Candidate {sortKey === 'name' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>)}
            </div>
            <div className="col-span-3 cursor-pointer flex items-center gap-1 hover:text-white" onClick={() => handleSort('role')}>
              Role {sortKey === 'role' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>)}
            </div>
            <div className="col-span-1 text-center cursor-pointer flex items-center justify-center gap-1 hover:text-white" onClick={() => handleSort('ledgera_rank')}>
              Our Rank {sortKey === 'ledgera_rank' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>)}
            </div>
            <div className="col-span-1 text-center cursor-pointer flex items-center justify-center gap-1 hover:text-white" onClick={() => handleSort('ats_rank')}>
              ATS {sortKey === 'ats_rank' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>)}
            </div>
            <div className="col-span-1 text-center cursor-pointer flex items-center justify-center gap-1 hover:text-white" onClick={() => handleSort('tmi')}>
              TMI {sortKey === 'tmi' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>)}
            </div>
            <div className="col-span-1 text-center cursor-pointer flex items-center justify-center gap-1 hover:text-white" onClick={() => handleSort('fit')}>
              Fit {sortKey === 'fit' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>)}
            </div>
            <div className="col-span-2 text-right cursor-pointer flex items-center justify-end gap-1 hover:text-white" onClick={() => handleSort('conviction')}>
              Conviction {sortKey === 'conviction' && (sortOrder === 'asc' ? <ChevronUp className="w-3 h-3"/> : <ChevronDown className="w-3 h-3"/>)}
            </div>
         </div>

         {/* Table Body */}
         <div className="flex-1 overflow-y-auto">
            {filteredData.map(cand => (
               <div 
                 key={cand.id} 
                 onClick={() => setSelectedCandidate(cand)}
                 className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer text-sm transition-colors items-center"
               >
                 <div className="col-span-3 font-medium text-white truncate">{cand.name}</div>
                 <div className="col-span-3 text-slate-400 truncate">{cand.role}</div>
                 <div className="col-span-1 text-center font-medium text-indigo-400">#{cand.ledgera_rank}</div>
                 <div className="col-span-1 text-center text-slate-500">#{cand.ats_rank}</div>
                 <div className="col-span-1 text-center">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium",
                      cand.tmi > 20 ? "bg-cyan-500/10 text-cyan-400" : cand.tmi < -20 ? "bg-rose-500/10 text-rose-400" : "text-slate-400"
                    )}>
                      {cand.tmi > 0 ? '+' : ''}{cand.tmi.toFixed(0)}
                    </span>
                 </div>
                 <div className="col-span-1 text-center text-emerald-400">{cand.fit}%</div>
                 <div className="col-span-2 text-right text-slate-300">
                    <div className="flex items-center justify-end gap-2">
                       <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${cand.conviction}%` }}></div>
                       </div>
                       <span className="w-8 text-right">{cand.conviction}%</span>
                    </div>
                 </div>
               </div>
            ))}
         </div>
      </div>

      {/* Detail Drawer overlay */}
      <AnimatePresence>
         {selectedCandidate && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCandidate(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 rounded-2xl"
              />
              <motion.div 
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute top-0 right-0 bottom-0 w-[500px] bg-[#0f1115] border-l border-white/10 z-20 rounded-r-2xl shadow-2xl flex flex-col"
              >
                 <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{selectedCandidate.name}</h3>
                      <p className="text-sm text-slate-400">{selectedCandidate.role}</p>
                    </div>
                    <button onClick={() => setSelectedCandidate(null)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <X className="w-5 h-5 text-slate-400" />
                    </button>
                 </div>
                 
                 <div className="p-6 flex-1 overflow-y-auto space-y-8">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="text-xs text-slate-500 mb-1">Ledgera Rank</div>
                          <div className="text-3xl font-semibold text-indigo-400">#{selectedCandidate.ledgera_rank}</div>
                       </div>
                       <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                          <div className="text-xs text-slate-500 mb-1">Legacy ATS</div>
                          <div className="text-3xl font-semibold text-slate-500">#{selectedCandidate.ats_rank}</div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Core Metrics</h4>
                       <div className="space-y-3">
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Talent Mispricing Index</span>
                            <span className={cn("font-semibold", selectedCandidate.tmi > 0 ? "text-cyan-400" : "text-rose-400")}>
                              {selectedCandidate.tmi > 0 ? '+' : ''}{selectedCandidate.tmi.toFixed(1)}
                            </span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Intelligence Fit</span>
                            <span className="text-emerald-400 font-medium">{selectedCandidate.fit}%</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Model Conviction</span>
                            <span className="text-indigo-400 font-medium">{selectedCandidate.conviction}%</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Evidence Density</span>
                            <span className="text-amber-400 font-medium">{selectedCandidate.evidence_density}%</span>
                         </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Intelligence Drivers</h4>
                       <ul className="space-y-2">
                          {selectedCandidate.trust_drivers.length > 0 ? selectedCandidate.trust_drivers.map((d, i) => (
                             <li key={i} className="text-sm text-slate-300 flex leading-relaxed"><span className="text-emerald-500 mr-2 mt-0.5">•</span>{d}</li>
                          )) : <li className="text-sm text-slate-500 italic">No explicit drivers defined.</li>}
                       </ul>
                    </div>

                    {selectedCandidate.concerns.length > 0 && (
                      <div className="space-y-4">
                         <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Legacy ATS Penalty</h4>
                         <ul className="space-y-2">
                            {selectedCandidate.concerns.map((c, i) => (
                               <li key={i} className="text-sm text-slate-400 flex leading-relaxed"><span className="text-rose-500 mr-2 mt-0.5">•</span>{c}</li>
                            ))}
                         </ul>
                      </div>
                    )}
                 </div>
              </motion.div>
            </>
         )}
      </AnimatePresence>
    </div>
  )
}
