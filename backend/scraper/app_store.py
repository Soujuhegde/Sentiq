from app_store_scraper import AppStore
import pandas as pd
from datetime import datetime

class AppStoreScraper:
    def __init__(self, app_name='sentiq', app_id='618783545'):
        self.app_name = app_name
        self.app_id = app_id

    def fetch_reviews(self, count=20):
        """
        Fetches reviews from Apple App Store.
        """
        try:
            app = AppStore(country='us', app_name=self.app_name, app_id=self.app_id)
            app.review(how_many=count)
            
            processed_reviews = []
            for r in app.reviews:
                processed_reviews.append({
                    'text': r['review'],
                    'author': r['userName'],
                    'rating': r['rating'],
                    'timestamp': r['date'],
                    'source': 'App Store'
                })
            
            return processed_reviews
        except Exception as e:
            print(f"Error fetching App Store reviews: {e}")
            return []

if __name__ == "__main__":
    scraper = AppStoreScraper('whatsapp-messenger', '310633997')
    revs = scraper.fetch_reviews(5)
    print(f"Fetched {len(revs)} reviews.")
