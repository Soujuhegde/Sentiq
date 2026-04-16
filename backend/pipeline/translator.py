from langdetect import detect, DetectorFactory
from deep_translator import GoogleTranslator
import logging

# Ensure reproducible language detection
DetectorFactory.seed = 0

class Translator:
    def __init__(self, target_lang='en'):
        self.target_lang = target_lang
        self.translator = GoogleTranslator(source='auto', target=target_lang)

    def process(self, text):
        """
        Detects language and translates to target_lang if necessary.
        """
        try:
            lang = detect(text)
            if lang != self.target_lang:
                translated = self.translator.translate(text)
                return translated, lang, True
            return text, lang, False
        except Exception as e:
            logging.error(f"Translation/Detection error: {e}")
            return text, "unknown", False

if __name__ == "__main__":
    t = Translator()
    print(t.process("La interfaz es muy lenta y el sistema falla a menudo."))
    print(t.process("The UI is great and very responsive."))
