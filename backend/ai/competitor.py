import os
import json
from anthropic import Anthropic

class CompetitorExtractor:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("ANTHROPIC_API_KEY")
        if self.api_key:
            self.client = Anthropic(api_key=self.api_key)
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
            message = self.client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=256,
                messages=[{"role": "user", "content": prompt}]
            )
            return json.loads(message.content[0].text)
        except Exception as e:
            print(f"Claude Competitor Error: {e}")
            return {"competitors": [], "comparisons": {}}

if __name__ == "__main__":
    extractor = CompetitorExtractor()
    print(extractor.extract("I used to love Apex Intel, but Sentiq is significantly faster."))
