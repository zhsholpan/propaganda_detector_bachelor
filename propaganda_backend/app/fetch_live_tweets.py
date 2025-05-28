import subprocess
import json

# List of Twitter usernames (without @)
accounts = [
    "elonmusk",
    "realDonaldTrump",
    "FoxNews",
    "YourAnonNews",
    "BernieSanders"
]

def fetch_tweets(username, limit=5):
    cmd = [
        "snscrape",
        "--jsonl",
        f"--max-results={limit}",
        f"twitter-user:{username}"
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    tweets = []
    
    if result.returncode == 0:
        for line in result.stdout.strip().split("\n"):
            try:
                tweet = json.loads(line)
                tweets.append({
                    "username": username,
                    "text": tweet["content"]
                })
            except json.JSONDecodeError:
                continue
    else:
        print(f"Failed to fetch tweets for {username}")
    
    return tweets

def main():
    all_tweets = []
    for account in accounts:
        tweets = fetch_tweets(account, limit=5)
        all_tweets.extend(tweets)

    print("\n📢 Fetched tweets:")
    for t in all_tweets:
        print(f"@{t['username']}: {t['text']}\n")

    # You can now send `t['text']` to your FastAPI backend here
    # e.g., using requests.post("http://127.0.0.1:8000/predict", json={"text": t["text"]})

if __name__ == "__main__":
    main()
