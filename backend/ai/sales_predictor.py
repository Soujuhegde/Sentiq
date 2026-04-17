import os
import json
import google.generativeai as genai

class SalesPredictor:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.client = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.client = None

    def predict(self, sentiment_delta, market_context=""):
        """
        Calculates projected revenue impact of sentiment shifts using Gemini.
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
            response = self.client.generate_content(prompt)
            return json.loads(response.text)
        except Exception as e:
            print(f"Gemini Prediction Error: {e}")
            return {"projected_lift": "Unknown", "confidence": "0%", "rationale": "Error"}

if __name__ == "__main__":
    predictor = SalesPredictor()
    print(predictor.predict("+14%", "Competitor Apex Intel is currently experiencing high churn."))
