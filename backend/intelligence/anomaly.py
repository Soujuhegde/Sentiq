import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class AnomalyDetector:
    def detect_sentiment_drop(self, history, current_value, z_threshold=2.0):
        """
        Detects if the current sentiment value is a statistical outlier compared 
        to recent history.
        """
        if len(history) < 5:
            return False, 0.0

        mean = np.mean(history)
        std = np.std(history)
        
        if std == 0:
            return False, 0.0
            
        z_score = (current_value - mean) / std
        is_anomaly = z_score < -z_threshold # Significant drop
        
        return is_anomaly, z_score

    def find_keyword_bursts(self, reviews, threshold=3):
        """
        Identifies keywords that are appearing more frequently than usual.
        """
        import collections
        all_words = []
        for r in reviews:
            words = r['text'].lower().split()
            all_words.extend([w for w in words if len(w) > 3])
            
        counts = collections.Counter(all_words)
        bursts = {k: v for k, v in counts.items() if v > threshold}
        return bursts

if __name__ == "__main__":
    detector = AnomalyDetector()
    hist = [0.8, 0.82, 0.81, 0.79, 0.83, 0.81]
    curr = 0.6 # Sudden drop
    print(detector.detect_sentiment_drop(hist, curr))
