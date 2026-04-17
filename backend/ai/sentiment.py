import os
import json
from anthropic import Anthropic

class ClaudeSentiment:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("ANTHROPIC_API_KEY")
        if self.api_key:
            self.client = Anthropic(api_key=self.api_key)
        else:
            self.client = None

    def analyze(self, text):
        """
        Extracts features, sentiment scores, and confidence scores using Claude.
        """
        if not self.client:
            # Fallback mock if no API key
            return {
                "raw": "Neutral", 
                "score": 0.5, 
                "features": {"General": {"sentiment": 0.5, "confidence": 0.9}}
            }

        prompt = f"""
        Analyze the following user review for sentiment and feature-level details.
        Review: "{text}"
        
        Identify specific product attributes (e.g., battery life, packaging quality, delivery speed, taste, durability, customer support, UI, performance).
        
        Output valid JSON with:
        - "raw": (Positive/Negative/Neutral)
        - "score": (0.0 to 1.0 overall sentiment intensity)
        - "features": (Object where keys are attribute names and values are objects containing:
            - "sentiment": (0.0 to 1.0 score)
            - "confidence": (0.0 to 1.0 score for how certain you are about this attribute extraction)
        )
        
        JSON Only.
        """

        try:
            message = self.client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=512,
                messages=[{"role": "user", "content": prompt}]
            )
            return json.loads(message.content[0].text)
        except Exception as e:
            print(f"Claude Sentiment Error: {e}")
            return {"raw": "Error", "score": 0.0, "features": {}}

if __name__ == "__main__":
    analyzer = ClaudeSentiment()
    print(analyzer.analyze("The app is visually stunning but the search latency is terrible."))
