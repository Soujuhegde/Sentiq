import os
import json
import google.generativeai as genai
try:
    from transformers import pipeline
    LOCAL_MODEL = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
except Exception as e:
    print(f"Local AI Model Load Fail: {e}")
    LOCAL_MODEL = None

class GeminiSentiment:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.client = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.client = None

    def analyze(self, text):
        """
        Extracts features, sentiment scores, and confidence scores using Gemini.
        """
        if not self.client:
            if LOCAL_MODEL:
                try:
                    res = LOCAL_MODEL(text)[0]
                    label, score = res['label'].capitalize(), res['score']
                    return {
                        "raw": label, 
                        "score": score, 
                        "is_sarcastic": False,
                        "insufficient_detail": True,
                        "features": {"General": {"sentiment": score, "confidence": 0.95}}
                    }
                except: pass
            return {
                "raw": "Neutral", 
                "score": 0.5, 
                "is_sarcastic": False,
                "insufficient_detail": True,
                "features": {"General": {"sentiment": 0.5, "confidence": 0.9}}
            }

        prompt = f"""
        Analyze the following user review for sentiment and feature-level details.
        Review: "{text}"
        
        Identify specific product attributes (e.g., battery life, packaging quality, delivery speed, taste, durability, customer support, UI, performance).
        Check for explicit sarcasm using sentiment-context mismatch (e.g., saying 'oh fantastic' when the app crashes).
        
        Output valid JSON with:
        - "raw": (Positive/Negative/Neutral)
        - "score": (0.0 to 1.0 overall sentiment intensity)
        - "is_sarcastic": (boolean, true if sarcastic)
        - "features": (Object where keys are attribute names and values are objects containing:
            - "sentiment": (0.0 to 1.0 score. E.g., 0.1 for bad battery, 0.9 for great UI)
            - "confidence": (0.0 to 1.0 score for how certain you are about this attribute extraction)
        )
        
        Ensure you extract at least 3 features. If the text does not contain enough information for 3 features, extract whatever you realistically can.
        
        Return RAW JSON Only. Do not include markdown blocks.
        """

        try:
            response = self.client.generate_content(prompt)
            # Clean up potential markdown formatting from response
            cleaned_resp = response.text.strip()
            if cleaned_resp.startswith("```json"):
                cleaned_resp = cleaned_resp[7:]
            if cleaned_resp.endswith("```"):
                cleaned_resp = cleaned_resp[:-3]
                
            data = json.loads(cleaned_resp.strip())
            
            # Ensure minimum 3 features requirement or flag insufficient detail
            if len(data.get("features", {})) < 3:
                data["insufficient_detail"] = True
            else:
                data["insufficient_detail"] = False
                
            # Default is_sarcastic if missing
            if "is_sarcastic" not in data:
                data["is_sarcastic"] = False
                
            return data
        except Exception as e:
            print(f"Gemini Sentiment Error: {e}")
            return {"raw": "Error", "score": 0.0, "is_sarcastic": False, "insufficient_detail": True, "features": {}}

if __name__ == "__main__":
    analyzer = GeminiSentiment()
    print(analyzer.analyze("The app is visually stunning but the search latency is terrible."))
