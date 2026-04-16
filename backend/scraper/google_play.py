from google_play_scraper import reviews, Sort
import pandas as pd
from datetime import datetime

class GooglePlayScraper:
    def __init__(self, app_id='com.sentiq.app'):
        self.app_id = app_id

    def fetch_reviews(self, count=100):
        """
        Fetches reviews from Google Play Store.
        """
        try:
            result, _ = reviews(
                self.app_id,
                lang='en',
                country='us',
                sort=Sort.NEWEST,
                count=count
            )
            
            processed_reviews = []
            for r in result:
                processed_reviews.append({
                    'text': r['content'],
                    'author': r['userName'],
                    'rating': r['score'],
                    'timestamp': r['at'],
                    'source': 'Google Play'
                })
            
            return processed_reviews
        except Exception as e:
            print(f"Error fetching Google Play reviews: {e}")
            return []

if __name__ == "__main__":
    scraper = GooglePlayScraper('com.skype.raider') # Test with Skype
    revs = scraper.fetch_reviews(5)
    print(f"Fetched {len(revs)} reviews.")
    for r in revs:
        print(f"- {r['text'][:50]}...")
