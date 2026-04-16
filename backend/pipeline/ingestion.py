import pandas as pd
import json
import csv
from datetime import datetime
from io import StringIO

class DataIngestor:
    def normalize_csv(self, file_path):
        """
        Loads and normalizes CSV data.
        """
        df = pd.read_csv(file_path)
        return self._to_review_list(df)

    def normalize_json(self, json_data):
        """
        Normalizes raw JSON review lists.
        """
        if isinstance(json_data, str):
            data = json.loads(json_data)
        else:
            data = json_data
        
        df = pd.DataFrame(data)
        return self._to_review_list(df)

    def normalize_paste(self, text_blob, source="Manual"):
        """
        Normalizes a raw text block (e.g. pasted reviews).
        """
        lines = text_blob.strip().split('\n')
        normalized = []
        for line in lines:
            if line.strip():
                normalized.append({
                    'text': line.strip(),
                    'source': source,
                    'timestamp': datetime.utcnow(),
                    'rating': 5 # Default for manual paste
                })
        return normalized

    def _to_review_list(self, df):
        # Ensure column mapping
        col_map = {
            'review_text': 'text',
            'comment': 'text',
            'content': 'text',
            'username': 'author',
            'score': 'rating'
        }
        df = df.rename(columns=col_map)
        
        # Fill missing required cols
        if 'source' not in df.columns:
            df['source'] = 'Import'
        if 'timestamp' not in df.columns:
            df['timestamp'] = datetime.utcnow()
        if 'rating' not in df.columns:
            df['rating'] = 0

        return df.to_dict('records')

if __name__ == "__main__":
    ingestor = DataIngestor()
    sample = "Love this app!\nTerrible experience, laggy UI.\nCompetitive price point."
    print(ingestor.normalize_paste(sample))
