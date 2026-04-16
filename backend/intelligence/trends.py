import pandas as pd
from datetime import datetime, timedelta

class TrendEngine:
    def calculate_rolling_sentiment(self, reviews_df, window_days=7):
        """
        Calculates the rolling average sentiment from a DataFrame of reviews.
        """
        if reviews_df.empty:
            return 0.0

        # Ensure datetime format
        reviews_df['timestamp'] = pd.to_datetime(reviews_df['timestamp'])
        
        # Sort by time
        reviews_df = reviews_df.sort_values('timestamp')
        
        # Convert sentiment to numeric
        sentiment_map = {'Positive': 1.0, 'Neutral': 0.5, 'Negative': 0.0}
        reviews_df['sentiment_val'] = reviews_df['raw_sentiment'].map(sentiment_map)
        
        # Calculate rolling mean
        trends = reviews_df.set_index('timestamp')['sentiment_val'].rolling(window=f'{window_days}D').mean()
        
        return trends.iloc[-1] if not trends.empty else 0.5

    def detect_spikes(self, reviews_df, threshold=0.2):
        """
        Detects sudden volume spikes in reviews.
        """
        if reviews_df.empty:
            return False, 0
            
        reviews_df['timestamp'] = pd.to_datetime(reviews_df['timestamp'])
        last_24h = reviews_df[reviews_df['timestamp'] > (datetime.utcnow() - timedelta(days=1))]
        previous_24h = reviews_df[(reviews_df['timestamp'] <= (datetime.utcnow() - timedelta(days=1))) & 
                                  (reviews_df['timestamp'] > (datetime.utcnow() - timedelta(days=2)))]
        
        count_now = len(last_24h)
        count_prev = len(previous_24h)
        
        if count_prev == 0:
            return count_now > 10, count_now
            
        increase = (count_now - count_prev) / count_prev
        return increase > threshold, increase

if __name__ == "__main__":
    data = {'timestamp': [datetime.utcnow(), datetime.utcnow() - timedelta(hours=2)],
            'raw_sentiment': ['Positive', 'Negative']}
    df = pd.DataFrame(data)
    engine = TrendEngine()
    print(f"Rolling Sentiment: {engine.calculate_rolling_sentiment(df)}")
