import os
import json
from anthropic import Anthropic

class SalesPredictor:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("ANTHROPIC_API_KEY")
        if self.api_key:
            self.client = Anthropic(api_key=self.api_key)
        else:
            self.client = None

    def predict(self, sentiment_delta, market_context=""):
        """
        Calculates projected revenue impact of sentiment shifts using Claude.
        """
        if not self.client:
            return {"projected_lift": "$0", "confidence": "0%", "rationale": "Offline"}

        prompt = f"""
        Given a sentiment improvement delta of {sentiment_delta} over the last 30 days,
        and the following market context: "{market_context}", 
        predict the potential sales/revenue lift for a B2B SaaS company ($50M ARR).

        Output valid JSON with:
        - "projected_lift": (Currency value string)
        - "confidence": (Percentage)
        - "rationale": (Brief 1-sentence explanation)
        
        JSON Only.
        """

        try:
            message = self.client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=256,
                messages=[{"role": "user", "content": prompt}]
            )
            return json.loads(message.content[0].text)
        except Exception as e:
            print(f"Claude Prediction Error: {e}")
            return {"projected_lift": "Unknown", "confidence": "0%", "rationale": "Error"}

if __name__ == "__main__":
    predictor = SalesPredictor()
    print(predictor.predict("+14%", "Competitor Apex Intel is currently experiencing high churn."))
