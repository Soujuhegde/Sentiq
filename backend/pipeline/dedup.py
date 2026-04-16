from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class ReviewDedup:
    def __init__(self, threshold=0.85):
        self.threshold = threshold
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def find_duplicates(self, new_reviews, existing_reviews):
        """
        Identifies reviews in new_reviews that are semantically too 
        similar to reviews in existing_reviews.
        """
        if not existing_reviews or not new_reviews:
            return []

        all_existing_text = [r['text'] for r in existing_reviews]
        new_texts = [r['text'] for r in new_reviews]

        # Combine for vectorization
        combined = all_existing_text + new_texts
        tfidf_matrix = self.vectorizer.fit_transform(combined)

        # Split matrix
        existing_matrix = tfidf_matrix[:len(all_existing_text)]
        new_matrix = tfidf_matrix[len(all_existing_text):]

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
