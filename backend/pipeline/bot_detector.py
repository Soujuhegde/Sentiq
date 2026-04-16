import re
from collections import Counter

class BotDetector:
    def __init__(self):
        # Common spam patterns
        self.spam_patterns = [
            r"earn money",
            r"click here",
            r"visit my site",
            r"whatsapp \+",
            r"t\.me/",
            r"crypto investment",
            r"free followers"
        ]

    def is_spam(self, text, user_history=None):
        """
        Heuristic-based spam detection.
        """
        # 1. Pattern matching
        for pattern in self.spam_patterns:
            if re.search(pattern, text, re.IGNORECASE):
                return True, "Spam Pattern Detected"

        # 2. Character diversity check
        if len(text) > 20:
            diversity = len(set(text)) / len(text)
            if diversity < 0.15: # Very repetitive
                return True, "Low Character Diversity"

        # 3. All caps check
        if text.isupper() and len(text) > 15:
            return True, "Excessive Capitalization"

        return False, "Clean"

if __name__ == "__main__":
    detector = BotDetector()
    print(detector.is_spam("EARN MONEY FAST CLICK HERE NOW!!!!"))
    print(detector.is_spam("This app really helped my business workflow."))
