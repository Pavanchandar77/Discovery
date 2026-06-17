import { DashboardData } from "./types";

export const MOCK_DASHBOARD_DATA: DashboardData = {
  kpis: {
    market_efficiency_pct: 68.4,
    mispriced_pct: 31.6,
    hidden_gems: 14,
    avg_tmi: 42.1,
    highest_tmi: 94.3,
    n_candidates: 342,
  },
  hero: {
    id: "cand_1",
    name: "Elena Rostova",
    role: "Senior Machine Learning Engineer",
    ats_rank: 142,
    ledgera_rank: 1,
    tmi: 94.3,
    evidence_density: 88,
    fit: 96,
    conviction: 98,
    trust_drivers: [
      "Authored highly cited paper on efficient attention mechanisms matching company's core challenge",
      "Contributed to open source ML infrastructure library used by target team",
      "Career trajectory shows rapid promotion in elite engineering environments",
    ],
    concerns: [
      "Lacks formal CS degree (Self-taught/Physics Background) - likely cause of ATS penalty",
      "No management experience on resume",
    ],
  },
  ats_top10: [
    { id: "cand_101", name: "Michael Chen", role: "Sr MLE", ats_rank: 1, ledgera_rank: 45, tmi: -44, evidence_density: 45, fit: 60, conviction: 50, trust_drivers: [], concerns: [] },
    { id: "cand_102", name: "Sarah Jenkins", role: "Sr MLE", ats_rank: 2, ledgera_rank: 12, tmi: -10, evidence_density: 70, fit: 85, conviction: 80, trust_drivers: [], concerns: [] },
    { id: "cand_103", name: "David Kim", role: "Sr MLE", ats_rank: 3, ledgera_rank: 55, tmi: -52, evidence_density: 30, fit: 50, conviction: 45, trust_drivers: [], concerns: [] },
    { id: "cand_104", name: "Amanda Richards", role: "Sr MLE", ats_rank: 4, ledgera_rank: 22, tmi: -18, evidence_density: 65, fit: 75, conviction: 70, trust_drivers: [], concerns: [] },
    { id: "cand_105", name: "James Wilson", role: "Sr MLE", ats_rank: 5, ledgera_rank: 88, tmi: -83, evidence_density: 20, fit: 40, conviction: 35, trust_drivers: [], concerns: [] },
    { id: "cand_106", name: "Emma Thompson", role: "Sr MLE", ats_rank: 6, ledgera_rank: 8, tmi: -2, evidence_density: 80, fit: 88, conviction: 85, trust_drivers: [], concerns: [] },
    { id: "cand_107", name: "Robert Taylor", role: "Sr MLE", ats_rank: 7, ledgera_rank: 115, tmi: -108, evidence_density: 15, fit: 30, conviction: 25, trust_drivers: [], concerns: [] },
    { id: "cand_108", name: "Jessica Anderson", role: "Sr MLE", ats_rank: 8, ledgera_rank: 34, tmi: -26, evidence_density: 50, fit: 65, conviction: 60, trust_drivers: [], concerns: [] },
    { id: "cand_109", name: "Christopher Lee", role: "Sr MLE", ats_rank: 9, ledgera_rank: 6, tmi: 3, evidence_density: 85, fit: 90, conviction: 88, trust_drivers: [], concerns: [] },
    { id: "cand_110", name: "Ashley Davis", role: "Sr MLE", ats_rank: 10, ledgera_rank: 76, tmi: -66, evidence_density: 25, fit: 45, conviction: 40, trust_drivers: [], concerns: [] },
  ],
  our_top10: [
    { id: "cand_1", name: "Elena Rostova", role: "Sr MLE", ats_rank: 142, ledgera_rank: 1, tmi: 94.3, evidence_density: 88, fit: 96, conviction: 98, trust_drivers: [], concerns: [] },
    { id: "cand_2", name: "Marcus Johnson", role: "Sr MLE", ats_rank: 89, ledgera_rank: 2, tmi: 87.0, evidence_density: 92, fit: 95, conviction: 94, trust_drivers: [], concerns: [] },
    { id: "cand_3", name: "Priya Sharma", role: "Sr MLE", ats_rank: 215, ledgera_rank: 3, tmi: 212.0, evidence_density: 85, fit: 94, conviction: 93, trust_drivers: [], concerns: [] },
    { id: "cand_4", name: "Alexei Volkov", role: "Sr MLE", ats_rank: 45, ledgera_rank: 4, tmi: 41.0, evidence_density: 78, fit: 92, conviction: 91, trust_drivers: [], concerns: [] },
    { id: "cand_5", name: "Nina Patel", role: "Sr MLE", ats_rank: 12, ledgera_rank: 5, tmi: 7.0, evidence_density: 82, fit: 91, conviction: 90, trust_drivers: [], concerns: [] },
    { id: "cand_109", name: "Christopher Lee", role: "Sr MLE", ats_rank: 9, ledgera_rank: 6, tmi: 3.0, evidence_density: 85, fit: 90, conviction: 88, trust_drivers: [], concerns: [] },
    { id: "cand_6", name: "Samir Desai", role: "Sr MLE", ats_rank: 188, ledgera_rank: 7, tmi: 181.0, evidence_density: 75, fit: 89, conviction: 87, trust_drivers: [], concerns: [] },
    { id: "cand_106", name: "Emma Thompson", role: "Sr MLE", ats_rank: 6, ledgera_rank: 8, tmi: -2.0, evidence_density: 80, fit: 88, conviction: 85, trust_drivers: [], concerns: [] },
    { id: "cand_7", name: "Jordan Casey", role: "Sr MLE", ats_rank: 301, ledgera_rank: 9, tmi: 292.0, evidence_density: 95, fit: 87, conviction: 84, trust_drivers: [], concerns: [] },
    { id: "cand_8", name: "Wei Zhang", role: "Sr MLE", ats_rank: 56, ledgera_rank: 10, tmi: 46.0, evidence_density: 68, fit: 86, conviction: 82, trust_drivers: [], concerns: [] },
  ],
  cards: []
};

// Populate cards with a mix of top 10s and some random filler for the scatter plot
MOCK_DASHBOARD_DATA.cards = [
  ...MOCK_DASHBOARD_DATA.our_top10,
  ...MOCK_DASHBOARD_DATA.ats_top10.filter(c => !MOCK_DASHBOARD_DATA.our_top10.find(o => o.id === c.id)),
];

// Add extra mock candidates for the scatter plot
for (let i = 20; i < 150; i++) {
  const ats_rank = Math.floor(Math.random() * 342) + 1;
  const ledgera_rank = Math.floor(Math.random() * 342) + 1;
  const fit = Math.floor(Math.random() * 100);
  const conviction = Math.floor(Math.random() * 100);
  const evidence_density = Math.floor(Math.random() * 100);
  const tmi = ats_rank - ledgera_rank; // Simplified TMI

  // Give a few random "Hidden Gems"
  if (tmi > 80 && fit > 85) {
     MOCK_DASHBOARD_DATA.cards.push({
      id: `cand_rand_${i}`,
      name: `Hidden Gem ${i}`,
      role: "Software Engineer",
      ats_rank,
      ledgera_rank,
      tmi,
      evidence_density: Math.max(70, evidence_density),
      fit: Math.max(85, fit),
      conviction: Math.max(80, conviction),
      trust_drivers: ["Open source contributor", "Deep domain expertise"],
      concerns: ["Non-traditional background", "Employment gap"],
     });
  } else {
    MOCK_DASHBOARD_DATA.cards.push({
      id: `cand_rand_${i}`,
      name: `Candidate ${i}`,
      role: "Software Engineer",
      ats_rank,
      ledgera_rank,
      tmi,
      evidence_density,
      fit,
      conviction,
      trust_drivers: [],
      concerns: [],
    });
  }
}
