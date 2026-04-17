from fastapi import FastAPI, Depends, BackgroundTasks, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import asyncio
import json
import os
from dotenv import load_dotenv

# Load neural environment variables
load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'sentiq.db')}"
from database import engine, Base, Review, get_db
from scraper.google_play import GooglePlayScraper
from pipeline.ingestion import DataIngestor
from pipeline.cleaner import TextCleaner
from pipeline.translator import Translator
from pipeline.bot_detector import BotDetector
from pipeline.dedup import ReviewDedup
from ai.sentiment import ClaudeSentiment
from ai.chatbot import StrategicChatbot
from ai.competitor import CompetitorExtractor
from intelligence.priority import PriorityEngine
from intelligence.trends import TrendEngine
import pandas as pd

app = FastAPI(title="Sentiq Neural Backend")

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Active WebSocket connections
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

# --- Dependencies ---
cleaner = TextCleaner()
translator = Translator()
analyzer = ClaudeSentiment()
priority = PriorityEngine()
chatbot = StrategicChatbot()
extractor = CompetitorExtractor()
trends_engine = TrendEngine()
bot_detector = BotDetector()
deduper = ReviewDedup()

# --- Background Work ---
async def run_scraper_task(app_id: str, db: Session):
    scraper = GooglePlayScraper(app_id)
    raw_reviews = scraper.fetch_reviews(count=20)
    
    # 1. Deduplication Prep: Get recent reviews from DB to avoid re-processing
    recent_db_reviews = db.query(Review).order_by(Review.timestamp.desc()).limit(100).all()
    existing_texts = [r.text for r in recent_db_reviews]
    
    for r in raw_reviews:
        # A. Spam/Bot Detection
        is_spam, reason = bot_detector.is_spam(r['text'])
        
        # B. Cleaning & Translation
        cleaned = cleaner.clean(r['text'])
        translated, lang, _ = translator.process(cleaned)
        
        # C. Deduplication Check
        dupe_indices = deduper.find_duplicates([translated], existing_texts)
        if dupe_indices:
            print(f"Skipping duplicate review: {translated[:50]}...")
            continue

        # D. Sentiment Analysis (only if not a bot)
        analysis = {"raw": "Neutral", "score": 0.5, "features": {}}
        if not is_spam:
            analysis = analyzer.analyze(translated)
        
        score = priority.calculate_score({**r, 'text': translated, 'raw_sentiment': analysis['raw']})
        
        # Save to DB
        new_review = Review(
            text=translated,
            source=r['source'],
            author=r['author'],
            rating=r['rating'],
            detected_language=lang,
            raw_sentiment=analysis['raw'],
            confidence_score=analysis['score'],
            features=analysis['features'],
            is_bot=1 if is_spam else 0,
            timestamp=r['timestamp']
        )
        db.add(new_review)
        db.commit()
        
        # Add to existing_texts to avoid duplicates within the same scrape batch
        existing_texts.append(translated)
        
        # Broadcast live to frontend (if not spam)
        if not is_spam:
            await manager.broadcast(json.dumps({
                "type": "new_review",
                "data": {
                    "text": translated,
                    "sentiment": analysis['raw'],
                    "priority": score,
                    "features": analysis['features']
                }
            }))

# --- Routes ---
@app.get("/")
def read_root():
    return {"status": "Neural Active", "version": "2026.4.1"}

@app.post("/trigger-scrape")
def trigger_scrape(app_id: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    background_tasks.add_task(run_scraper_task, app_id, db)
    return {"message": "Scrape task initiated in background."}

@app.get("/metrics")
def get_metrics(db: Session = Depends(get_db)):
    reviews = db.query(Review).all()
    avg_score = 0
    if reviews:
        avg_score = sum([r.confidence_score for r in reviews]) / len(reviews) * 100
    return {
        "total_reviews": len(reviews),
        "avg_sentiment": round(avg_score, 1),
        "active_nodes": len(reviews) * 2,
        "market_velocity": round(len(reviews) / 20.4, 1) if reviews else 0
    }

@app.get("/trends")
def get_trends(db: Session = Depends(get_db)):
    try:
        reviews = db.query(Review).order_by(Review.timestamp.asc()).all()
        if reviews:
            return [{"time": r.timestamp.strftime('%m-%d'), "sentiment": r.confidence_score * 100, "confidence": 85} for r in reviews]
    except Exception as e:
        print(f"DB Trends Error: {e}")
    return []

@app.get("/competitors")
def get_competitors():
    return [
        {"brand": "Sentiq", "sentiment": 84, "market_share": 14.8},
        {"brand": "VertexAI", "sentiment": 62, "market_share": 16.2},
        {"brand": "Apex Intel", "sentiment": 45, "market_share": 12.1},
        {"brand": "Zion Metrics", "sentiment": 71, "market_share": 10.4}
    ]

@app.post("/chatbot/query")
async def chatbot_query(data: dict, db: Session = Depends(get_db)):
    query = data.get("query", "")
    # Fetch recent context for the RAG
    recent_reviews = db.query(Review).order_by(Review.timestamp.desc()).limit(10).all()
    context = [{"text": r.text} for r in recent_reviews]
    
    response = chatbot.ask(query, context)
    return {"response": response}

@app.websocket("/ws/live")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
