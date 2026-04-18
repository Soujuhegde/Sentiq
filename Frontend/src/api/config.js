export const API_BASE_URL = "http://localhost:8000";
export const WS_BASE_URL = "ws://localhost:8000";

export const ENDPOINTS = {
  METRICS: `${API_BASE_URL}/metrics`,
  TRENDS: `${API_BASE_URL}/trends`,
  COMPETITORS: `${API_BASE_URL}/competitors`,
  CHATBOT: `${API_BASE_URL}/chatbot/query`,
  SCRAPE: `${API_BASE_URL}/trigger-scrape`,
  LIVE_WS: `${WS_BASE_URL}/ws/live`,
  CLUSTERING: `${API_BASE_URL}/api/clustering`,
  AUTHENTICITY: `${API_BASE_URL}/api/authenticity`,
  FEATURE_TRENDS: `${API_BASE_URL}/api/feature-trends`
};
