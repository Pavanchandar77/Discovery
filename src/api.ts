import { DashboardData } from "./types";
import { MOCK_DASHBOARD_DATA } from "./mockData";

const API_BASE = (import.meta as any).env.VITE_API_BASE_URL || "";

export async function fetchDemoDashboard(): Promise<DashboardData> {
  if (!API_BASE) {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DASHBOARD_DATA), 1200));
  }
  
  try {
    const res = await fetch(`${API_BASE}/demo`);
    if (!res.ok) throw new Error("Demo fetch failed");
    return res.json();
  } catch (err) {
    console.warn("API failed, falling back to mock data", err);
    return MOCK_DASHBOARD_DATA;
  }
}

export async function uploadCandidatesAndRank(file: File): Promise<DashboardData> {
  if (!API_BASE) {
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DASHBOARD_DATA), 3000));
  }
  
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    const res = await fetch(`${API_BASE}/rank?top_k=100`, {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) throw new Error("Rank API failed");
    return res.json();
  } catch (err) {
    console.warn("API failed, falling back to mock data", err);
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_DASHBOARD_DATA), 3000));
  }
}
