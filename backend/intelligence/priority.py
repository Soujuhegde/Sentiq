class PriorityEngine:
    def calculate_score(self, review):
        """
        Calculates a priority score from 0-100 based on various metrics.
        Formula: (Rating Weight * -1) + (Sentiment Weight * -1) + (Bot Penalty) + (Keyword Bonus)
        """
        score = 50 # Baseline
        
        # Rating Weight (Lower rating = higher priority)
        if review['rating'] == 1: score += 30
        if review['rating'] == 2: score += 15
        if review['rating'] == 5: score -= 20
        
        # Sentiment weight
        if review.get('raw_sentiment') == 'Negative': score += 20
        if review.get('raw_sentiment') == 'Positive': score -= 10
        
        # Keyword triggers
        urgent_keywords = ['latency', 'crash', 'security', 'leak', 'broken', 'error']
        for kw in urgent_keywords:
            if kw in review['text'].lower():
                score += 15
                break

        # Cap scores
        return max(0, min(100, score))

if __name__ == "__main__":
    p = PriorityEngine()
    rev = {'text': 'System latency is too high, it crashes my server.', 'rating': 1, 'raw_sentiment': 'Negative'}
    print(f"Priority Score: {p.calculate_score(rev)}")
