import os
import json
import google.generativeai as genai

class StrategicChatbot:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.client = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.client = None

    def ask(self, query, context_reviews=[]):
        """
        Consults Gemini over a context of recent reviews to answer strategic queries.
        """
        if not self.client:
            return "AI Consulting Offline. Please provide an API key."

        # Flatten reviews into a context string
        context_str = "\n".join([f"- {r['text']}" for r in context_reviews])
        
        prompt = f"""
        You are Sentiq Strategic Engine (Gemini). Use the following user feedback context 
        to answer the query accurately. 
        
        FEEDBACK CONTEXT:
        {context_str}
        
        QUERY: "{query}"
        
        Answer professionally. If the data shows a trend, call it out.
        """

        try:
            response = self.client.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Gemini Chatbot Error: {e}")
            return "An intelligence synchronization error occurred."

if __name__ == "__main__":
    bot = StrategicChatbot()
    reviews = [
        {'text': 'Latency is spiking in London.'},
        {'text': 'Great UI, but slow database query.'}
    ]
    print(bot.ask("What is the core issue users are facing in EMEA?", reviews))
