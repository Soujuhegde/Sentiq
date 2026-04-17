import os
import json
import google.generativeai as genai

class RecGenerator:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.client = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.client = None

    def generate(self, trends_context, top_complaints=[]):
        """
        Generates actionable product/business recommendations based on trends.
        """
        if not self.client:
            return ["Upgrade DB latency clusters.", "Review Android 14 compatibility."]

        complaints_str = "\n".join([f"- {c}" for c in top_complaints])
        
        prompt = f"""
        Given the following trend data: {trends_context}
        And top customer complaints:
        {complaints_str}
        
        Generate 3 high-impact, actionable business recommendations. 
        Focus on technical fixes and strategic market moves.
        
        Output as a JSON list of strings.
        JSON Only.
        """

        try:
            response = self.client.generate_content(prompt)
            return json.loads(response.text)
        except Exception as e:
            print(f"Gemini Recs Error: {e}")
            return ["Improve system observability.", "Increase customer support headcount."]

if __name__ == "__main__":
    rec = RecGenerator()
    print(rec.generate("Sentiment down 10%, Latency up 20%", ["Slow dashboard", "Mobile crashes"]))
