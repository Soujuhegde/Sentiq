from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, JSON, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime
import os

SQLALCHEMY_DATABASE_URL = "sqlite:///./sentiq.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(Text, nullable=False)
    source = Column(String)  # Google Play, Amazon, etc.
    author = Column(String)
    rating = Column(Integer)
    detected_language = Column(String)
    raw_sentiment = Column(String)  # Positive, Negative, Neutral
    confidence_score = Column(Float)
    features = Column(JSON)  # {"UI": 0.2, "Latency": 0.9}
    is_bot = Column(Integer, default=0)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    processed_at = Column(DateTime, nullable=True)

class CompetitorAudit(Base):
    __tablename__ = "competitor_audits"
    id = Column(Integer, primary_key=True, index=True)
    brand_name = Column(String)
    metric = Column(String)
    value = Column(Float)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create tables
Base.metadata.create_all(bind=engine)
