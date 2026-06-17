export type Candidate = {
  id: string;
  name: string;
  role: string;
  ats_rank: number;
  ledgera_rank: number;
  tmi: number;
  evidence_density: number;
  fit: number;
  conviction: number;
  trust_drivers: string[];
  concerns: string[];
};

export type DashboardKPIs = {
  market_efficiency_pct: number;
  mispriced_pct: number;
  hidden_gems: number;
  avg_tmi: number;
  highest_tmi: number;
  n_candidates: number;
};

export type DashboardData = {
  kpis: DashboardKPIs;
  hero: Candidate;
  ats_top10: Candidate[];
  our_top10: Candidate[];
  cards: Candidate[];
};
