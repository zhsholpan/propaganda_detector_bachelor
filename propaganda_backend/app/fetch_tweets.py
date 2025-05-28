import os
import requests
from dotenv import load_dotenv
from utils.model_utils import (
    load_tokenizer,
    load_label_encoder,
    load_propaganda_model,
    preprocess_text
)

# Load environment variables
load_dotenv()
BEARER_TOKEN = os.getenv("BEARER_TOKEN")

# Load model + tokenizer + label encoder
tokenizer = load_tokenizer()
label_encoder = load_label_encoder()
model = load_propaganda_model()

def detect_propaganda(text):
    seq = preprocess_text(text, tokenizer)
    preds = model.predict(seq)[0]
    labels = label_encoder.classes_
    threshold = 0.2
    detected = {
        label.replace("_", " ").replace("-", "/").title(): round(float(score), 3)
        for label, score in zip(labels, preds)
        if score >= threshold
    }
    return detected

def fetch_tweets():
    headers = {"Authorization": f"Bearer {BEARER_TOKEN}"}
    query = "journalists OR patriots OR elites OR values OR truth lang:en -is:retweet"
    url = f"https://api.twitter.com/2/tweets/search/recent?query={query}&tweet.fields=text&max_results=10"

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        tweets = response.json().get("data", [])

        print("\n🧠 Analyzing Recent Tweets:\n")
        for idx, tweet in enumerate(tweets, 1):
            text = tweet["text"]
            prediction = detect_propaganda(text)
            print(f"{idx}. {text}")
            if prediction:
                print("   ⚠️ Detected Techniques:", ", ".join(prediction.keys()))
            else:
                print("   ✅ No propaganda detected.")
            print("-" * 80)

    except requests.exceptions.RequestException as e:
        print("❌ Error fetching tweets:", e)


if __name__ == "__main__":
    fetch_tweets()
