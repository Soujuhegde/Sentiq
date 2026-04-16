import os
import json
from anthropic import Anthropic

class StrategicChatbot:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("ANTHROPIC_API_KEY")
        if self.api_key:
            self.client = Anthropic(api_key=self.api_key)
        else:
            self.client = None

    def ask(self, query, context_reviews=[]):
        """
        Consults Claude over a context of recent reviews to answer strategic queries.
        """
        if not self.client:
            return "AI Consulting Offline. Please provide an API key."

        # Flatten reviews into a context string
        context_str = "\n".join([f"- {r['text']}" for r in context_reviews])
        
        prompt = f"""
        You are Sentiq Strategic Engine (Claude-v3). Use the following user feedback context 
        to answer the query accurately. 
        
        FEEDBACK CONTEXT:
        {context_str}
        
        QUERY: "{query}"
        
        Answer professionally. If the data shows a trend, call it out.
        """

        try:
            message = self.client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=512,
                messages=[{"role": "user", "content": prompt}]
            )
            return message.content[0].text
        except Exception as e:
            print(f"Claude Chatbot Error: {e}")
            return "An intelligence synchronization error occurred."

if __name__ == "__main__":
    bot = StrategicChatbot()
    reviews = [
        {'text': 'Latency is spiking in London.'},
        {'text': 'Great UI, but slow database query.'}
    ]
    print(bot.ask("What is the core issue users are facing in EMEA?", reviews))
