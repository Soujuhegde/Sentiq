import re
import emoji
import string

class TextCleaner:
    def clean(self, text):
        """
        Removes noise, normalizes whitespace, and strips extra symbols.
        """
        # 1. Remove Emojis
        text = emoji.replace_emoji(text, replace='')
        
        # 2. Normalize whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        
        # 3. Remove URLs
        text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
        
        # 4. Strip specific repetitive junk
        text = re.sub(r'(\w)\1{2,}', r'\1\1', text) # Normalize "cooooool" to "cool"
        
        return text

if __name__ == "__main__":
    cleaner = TextCleaner()
    dirty = "Great app! 🔥🔥 Very fast load time... check it out at http://sentiq.ai !!!"
    print(f"Clean: {cleaner.clean(dirty)}")
