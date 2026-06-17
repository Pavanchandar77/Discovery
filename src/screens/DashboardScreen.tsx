import { useState } from "react";
import { DashboardData } from "../types";
import { LayoutDashboard, Users, Sparkles, Map as MapIcon, Database, Download, LogOut } from "lucide-react";
import { cn } from "../lib/utils";

import HeroInsight from "../components/dashboard/HeroInsight";
import AtsComparison from "../components/dashboard/AtsComparison";
import HiddenGems from "../components/dashboard/HiddenGems";
import MarketMap from "../components/dashboard/MarketMap";
import CandidateExplorer from "../components/dashboard/CandidateExplorer";

interface Props {
  data: DashboardData;
  onExit: () => void;
}

type TabType = "overview" | "comparison" | "gems" | "map" | "explorer";

export default function DashboardScreen({ data, onExit }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const tabs = [
    { id: "overview", label: "Executive Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "comparison", label: "ATS vs Ledgera", icon: <Users className="w-4 h-4" /> },
    { id: "gems", label: "Hidden Gems", icon: <Sparkles className="w-4 h-4" /> },
    { id: "map", label: "Market Map", icon: <MapIcon className="w-4 h-4" /> },
    { id: "explorer", label: "Explorer", icon: <Database className="w-4 h-4" /> },
  ] as const;

  const handleExport = () => {
    // Basic CSV export
    const headers = "ID,Name,Role,ATS Rank,Ledgera Rank,Fit,Conviction,Evidence Density,TMI\n";
    const csv = data.cards.map(c => 
      `"${c.id}","${c.name}","${c.role}",${c.ats_rank},${c.ledgera_rank},${c.fit},${c.conviction},${c.evidence_density},${c.tmi}`
    ).join("\n");
    const blob = new Blob([headers + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ledgera-intelligence-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col relative text-slate-200">
      {/* Top Navbar */}
      <header className="h-16 px-6 border-b border-white/5 flex items-center justify-between bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="font-semibold tracking-wide text-white">Talent Market Intelligence</span>
        </div>

        <div className="flex items-center gap-2">
           <button onClick={handleExport} className="h-9 px-4 rounded-md bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors flex items-center gap-2 border border-white/10">
             <Download className="w-4 h-4" /> Export Report
           </button>
           <button onClick={onExit} className="h-9 px-3 rounded-md hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
             <LogOut className="w-4 h-4" />
           </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-[#0a0a0a]/50 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-600 mb-4 px-3 mt-2 tracking-wider uppercase">Views</div>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === tab.id 
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
              )}
            >
              {tab.icon} {tab.label}
            </button>
          ))}

          <div className="mt-8">
             <div className="text-xs font-semibold text-slate-600 mb-4 px-3 tracking-wider uppercase">Dataset Info</div>
             <div className="px-3 space-y-3">
               <div>
                 <div className="text-xs text-slate-500">Candidates Processed</div>
                 <div className="text-sm font-medium text-slate-300">{data.kpis.n_candidates.toLocaleString()}</div>
               </div>
               <div>
                 <div className="text-xs text-slate-500">Hidden Gems Found</div>
                 <div className="text-sm font-medium text-cyan-400">{data.kpis.hidden_gems}</div>
               </div>
               <div>
                 <div className="text-xs text-slate-500">Market Inefficiency</div>
                 <div className="text-sm font-medium text-rose-400">{data.kpis.mispriced_pct}%</div>
               </div>
             </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
           {activeTab === "overview" && <HeroInsight data={data} />}
           {activeTab === "comparison" && <AtsComparison data={data} />}
           {activeTab === "gems" && <HiddenGems data={data} />}
           {activeTab === "map" && <MarketMap data={data} />}
           {activeTab === "explorer" && <CandidateExplorer data={data} />}
        </main>
      </div>
    </div>
  )
}
