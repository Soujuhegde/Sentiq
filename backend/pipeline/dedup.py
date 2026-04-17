from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class ReviewDedup:
    def __init__(self, threshold=0.85):
        self.threshold = threshold
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def find_duplicates(self, new_texts, existing_texts):
        """
        Identifies reviews in new_texts that are semantically too 
        similar to reviews in existing_texts.
        """
        if not existing_texts or not new_texts:
            return []

        # Combine for vectorization
        combined = list(existing_texts) + list(new_texts)
        try:
            tfidf_matrix = self.vectorizer.fit_transform(combined)
        except ValueError: # Case where all words are stop words or too short
            return []

        # Split matrix
        existing_matrix = tfidf_matrix[:len(existing_texts)]
        new_matrix = tfidf_matrix[len(existing_texts):]

        # Compute similarity
        sim_scores = cosine_similarity(new_matrix, existing_matrix)

        duplicates_indices = []
        for i, scores in enumerate(sim_scores):
            if np.max(scores) > self.threshold:
                duplicates_indices.append(i)
        
        return duplicates_indices

if __name__ == "__main__":
    existing = [{'text': 'The app is great, but slow.'}]
    new = [
        {'text': 'Excellent app, although performance is laggy.'}, # Likely duplicate
        {'text': 'I love the new dark mode features.'} # Unique
    ]
    deduper = ReviewDedup()
    dupes = deduper.find_duplicates(new, existing)
    print(f"Duplicate indices: {dupes}")
