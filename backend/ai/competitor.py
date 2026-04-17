import os
import json
import google.generativeai as genai

class CompetitorExtractor:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.client = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.client = None

    def extract(self, text):
        """
        Extracts mentioned competitors and comparative sentiment from a review.
        """
        if not self.client:
            return {"competitors": [], "comparisons": []}

        prompt = f"""
        Identify any software competitors mentioned in this review.
        Review: "{text}"
        
        Output valid JSON with:
        - "competitors": (List of brand names)
        - "comparisons": (Object where keys are competitor names and values are 
                          comparative sentiment: 'better', 'worse', 'equal')
                          
        JSON Only.
        """

        try:
            response = self.client.generate_content(prompt)
            return json.loads(response.text)
        except Exception as e:
            print(f"Gemini Competitor Error: {e}")
            return {"competitors": [], "comparisons": {}}

if __name__ == "__main__":
    extractor = CompetitorExtractor()
    print(extractor.extract("I used to love Apex Intel, but Sentiq is significantly faster."))
