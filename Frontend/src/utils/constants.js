export const LIVE_FEED = [
  { id: 1, source: "App Store", sentiment: "positive", text: "Incredible UI, so easy to use!", time: "2 min ago" },
  { id: 2, source: "Play Store", sentiment: "negative", text: "App crashes on startup since update.", time: "5 min ago" },
  { id: 3, source: "Twitter", sentiment: "neutral", text: "Just trying out the new features.", time: "12 min ago" },
  { id: 4, source: "Trustpilot", sentiment: "positive", text: "Support team resolved my issue fast.", time: "15 min ago" },
  { id: 5, source: "Reddit", sentiment: "negative", text: "Pricing is way too high now.", time: "22 min ago" },
];

export const SENTIMENT_TRENDS = [
  { name: "Mon", positive: 400, neutral: 240, negative: 120 },
  { name: "Tue", positive: 300, neutral: 139, negative: 221 },
  { name: "Wed", positive: 200, neutral: 980, negative: 229 },
  { name: "Thu", positive: 278, neutral: 390, negative: 200 },
  { name: "Fri", positive: 189, neutral: 480, negative: 218 },
  { name: "Sat", positive: 239, neutral: 380, negative: 250 },
  { name: "Sun", positive: 349, neutral: 430, negative: 210 },
];

export const COMPETITORS_DATA = [
  { name: "Our Product", rating: 4.8, mentions: "12.4K", sentiment: 88, color: "#3b82f6" },
  { name: "Competitor A", rating: 4.2, mentions: "8.2K", sentiment: 62, color: "#f59e0b" },
  { name: "Competitor B", rating: 3.9, mentions: "5.1K", sentiment: 45, color: "#ef4444" },
  { name: "Competitor C", rating: 4.5, mentions: "9.5K", sentiment: 75, color: "#10b981" },
];

export const CHAT_HISTORY = [
  { role: "bot", content: "Hello! I am Sentiq AI. What would you like to know about your customer feedback?" },
  { role: "user", content: "What are the most common complaints this week?" },
  { role: "bot", content: "This week, the most common complaints (24%) relate to 'Login Issues' followed by 'Pricing' (18%). Would you like a detailed breakdown?" },
];

export const FEATURES_OVERVIEW = [
  { title: "Real-time Sentiment", description: "Monitor customer emotions as they happen across all channels." },
  { title: "Competitor Benchmarking", description: "See how your brand perception compares to industry rivals." },
  { title: "Revenue At Risk", description: "Identify critical feedback that correlates directly to churn." },
  { title: "AI Categorization", description: "Auto-tag and group reviews without setting up complex rules." },
];
