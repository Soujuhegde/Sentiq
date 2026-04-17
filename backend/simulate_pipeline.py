import sys
import os
import json
from datetime import datetime

# Add parent dir to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from pipeline.cleaner import TextCleaner
from pipeline.translator import Translator
from pipeline.bot_detector import BotDetector
from pipeline.dedup import ReviewDedup
from ai.sentiment import ClaudeSentiment

def simulate():
    print("--- STARTING SENTIQ PIPELINE SIMULATION ---")
    
    # Initialize components
    cleaner = TextCleaner()
    translator = Translator()
    bot_detector = BotDetector()
    deduper = ReviewDedup()
    analyzer = ClaudeSentiment() # Fallback mock used if no API key
    
    # Test Data: A mix of noise, bots, and real reviews
    reviews = [
        # 1. Dirty review with noisy chars
        {"text": "Love the app!!! Highly recommended. UI is smooth.", "author": "John"},
        # 2. Mixed language review
        {"text": "Bohat accha app hai, performance is great.", "author": "Amit"},
        # 3. Bot/Spam review
        {"text": "EARN MONEY FAST CLICK HERE NOW!!!!", "author": "Bot123"},
        # 4. Normal review
        {"text": "The battery life is draining too fast unfortunately.", "author": "Sarah"},
        # 5. Duplicate of review #1 (slightly modified)
        {"text": "Love the app!!! Highly recommended. Smooth UI.", "author": "John_Repeated"}
    ]
    
    existing_texts = []
    processed_results = []
    
    for r in reviews:
        print(f"\n[Processing] {r['author']}: {r['text'][:50]}...")
        
        # A. Bot Detection
        is_bot, reason = bot_detector.is_spam(r['text'])
        if is_bot:
            print(f"  [FLAG] Bot detected: {reason}")
        
        # B. Cleaning
        cleaned = cleaner.clean(r['text'])
        print(f"  [CLEAN] {cleaned[:50]}...")
        
        # C. Translation
        translated, lang, was_translated = translator.process(cleaned)
        if was_translated:
            print(f"  [TRANS] Detected {lang} -> English: {translated[:50]}...")
        
        # D. Deduplication
        dupe_indices = deduper.find_duplicates([translated], existing_texts)
        if dupe_indices:
            print(f"  [SKIP] Duplicate detected. Skipping...")
            continue
            
        # E. Sentiment Analysis
        # Save processing by skipping AI for bots
        analysis = {"raw": "Neutral", "score": 0.5, "features": {}}
        if not is_bot:
            analysis = analyzer.analyze(translated)
            print(f"  [AI] Sentiment: {analysis['raw']}, Features: {list(analysis['features'].keys())}")
        
        # Store metadata
        processed_results.append({
            "author": r['author'],
            "final_text": translated,
            "is_bot": is_bot,
            "sentiment": analysis['raw'],
            "features": analysis['features']
        })
        
        # Update cache for dedup
        existing_texts.append(translated)

    print("\n--- SIMULATION RESULTS ---")
    for res in processed_results:
        bot_label = "[BOT]" if res['is_bot'] else "[HUMAN]"
        print(f"{bot_label} {res['author']}: {res['sentiment']} | Features: {len(res['features'])}")

if __name__ == "__main__":
    simulate()
