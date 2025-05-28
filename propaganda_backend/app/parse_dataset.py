import os
import json
import re

# === CONFIG ===
DATASET_DIR = 'propaganda_backend/tweets_dataset/datasets/'
ARTICLES_DIR = os.path.join(DATASET_DIR, 'train-articles')
LABELS_FILE = os.path.join(DATASET_DIR, 'train-task2-TC.labels')
OUTPUT_FILE = os.path.join(DATASET_DIR, 'parsed_dataset.json')

# === STEP 1: Load Articles ===
def load_articles():
    articles = {}
    for filename in os.listdir(ARTICLES_DIR):
        if filename.endswith('.txt'):
            article_id = filename.replace('.txt', '')
            with open(os.path.join(ARTICLES_DIR, filename), 'r', encoding='utf-8') as f:
                articles[article_id] = f.read()
    print(f"✅ Loaded {len(articles)} articles")
    return articles

# === STEP 2: Load Labels with validation ===
def load_labels(articles):
    labels = {}
    with open(LABELS_FILE, 'r', encoding='utf-8') as f:
        for line_num, line in enumerate(f, start=1):
            parts = re.split(r'\s+', line.strip())
            if len(parts) != 4:
                print(f"⚠️ Skipping malformed line {line_num}: {line.strip()}")
                continue

            raw_id, start, end, label = parts

            # Fix bad ID (remove 'article' if exists)
            article_id = "article" + raw_id.replace("article", "")


            # Skip if article file doesn't exist
            if article_id not in articles:
                continue

            try:
                start, end = int(start), int(end)
            except ValueError:
                print(f"⚠️ Skipping line with non-integer span: {line.strip()}")
                continue

            # Check span length
            if end > len(articles[article_id]):
                continue

            if article_id not in labels:
                labels[article_id] = []

            labels[article_id].append({
                'start': start,
                'end': end,
                'label': label
            })

    print(f"✅ Loaded labels for {len(labels)} valid articles")
    return labels

# === STEP 3: Merge Articles with Labels ===
def merge_data(articles, labels):
    dataset = []
    labeled_count = 0
    for article_id, text in articles.items():
        entry = {
            'article_id': article_id,
            'text': text,
            'techniques': []
        }
        if article_id in labels:
            for item in labels[article_id]:
                span_text = text[item['start']:item['end']]
                entry['techniques'].append({
                    'start': item['start'],
                    'end': item['end'],
                    'label': item['label'],
                    'span': span_text
                })
            if entry['techniques']:
                labeled_count += 1
        dataset.append(entry)
    print(f"✅ Created dataset with {labeled_count} labeled articles")
    return dataset

# === STEP 4: Save to JSON ===
def save_to_json(data, output_path):
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"📁 Saved dataset to {output_path}")

# === RUN SCRIPT ===
if __name__ == '__main__':
    print("🔄 Parsing dataset...")
    articles = load_articles()
    labels = load_labels(articles)
    merged = merge_data(articles, labels)
    save_to_json(merged, OUTPUT_FILE)
