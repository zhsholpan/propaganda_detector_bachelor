# === backend: app/api/main.py ===

import sys
import os
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from app.utils.model_utils import (
    load_tokenizer,
    load_label_encoder,
    load_propaganda_model,
    preprocess_text
)

# Initialize global variables but do NOT load yet
tokenizer = None
label_encoder = None
model = None

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Fully defined technique details ===
technique_data = {
    "Loaded Language": {
        "definition": "Loaded language uses words that evoke strong emotions to manipulate the audience’s perception.",
        "explanation": "Uses emotionally charged words to sway opinion.",
        "why": "The words used carry strong emotional weight designed to provoke or manipulate the audience."
    },
    "Appeal To Fear/Prejudice": {
        "definition": "This form of propaganda attempts to arouse fear or exploit existing prejudices.",
        "explanation": "Uses fear or bias to influence public perception or behavior.",
        "why": "This sentence instills fear or targets groups to influence opinion through bias."
    },
    "Flag-Waving": {
        "definition": "Flag-waving links a message to patriotism or national identity to gain approval.",
        "explanation": "Links ideas to nationalism or patriotism.",
        "why": "The language appeals to nationalism or identity to validate the message."
    },
    "Stereotyping": {
        "definition": "Stereotyping reduces individuals or groups to simplistic categories, often unfairly.",
        "explanation": "Generalizes groups or individuals based on limited traits.",
        "why": "The sentence assigns generalized characteristics to a group, promoting biased thinking."
    },
    "Appeal To Authority": {
        "definition": "This technique cites respected figures to support a viewpoint and sway opinion.",
        "explanation": "Cites authoritative figures to legitimize arguments.",
        "why": "The sentence relies on authority figures to legitimize a claim without additional evidence."
    },
    "Causal Oversimplification": {
        "definition": "Causal oversimplification occurs when a complex issue is explained using a single or overly simple cause.",
        "explanation": "Reduces complex issues to simple causes.",
        "why": "This sentence attributes a broad behavioral trait to a simple cause, ignoring broader social or political factors."
    },
    "Doubt": {
        "definition": "Doubt casts uncertainty on facts or motivations to reduce credibility or trust.",
        "explanation": "Suggests lack of truth or reliability to manipulate perception.",
        "why": "It questions the truthfulness or motivation of individuals or institutions to instill uncertainty."
    },
    "Exaggeration,Minimisation": {
        "definition": "This technique overstates or downplays facts to shape audience reaction.",
        "explanation": "Overstates or understates importance to influence opinion.",
        "why": "The sentence stretches or diminishes the facts to evoke a reaction or diminish concern."
    },
    "Name Calling,Labeling": {
        "definition": "This technique uses derogatory language or labels to attack a person or idea.",
        "explanation": "Links a person or idea to a negative symbol or label to discredit them.",
        "why": "The sentence uses labels or accusations to create a negative perception without factual basis."
    }
}

# === Load models once on startup ===
@app.on_event("startup")
async def startup_event():
    global tokenizer, label_encoder, model
    tokenizer = load_tokenizer()
    label_encoder = load_label_encoder()
    model = load_propaganda_model()
    print("✅ Models and tokenizer loaded at startup")

class TextInput(BaseModel):
    text: str

@app.post("/predict")
def predict_text(input: TextInput):
    text = input.text
    seq = preprocess_text(text, tokenizer)
    preds = model.predict(seq)[0]
    labels = label_encoder.classes_
    threshold = 0.2

    result = {}
    for label, score in zip(labels, preds):
        if score >= threshold:
            label_fmt = label.replace("_", " ").replace("-", "/").title()
            data = technique_data.get(label_fmt, {})
            result[label_fmt] = {
                "score": round(float(score), 3),
                "explanation": data.get("explanation", "Explanation not available."),
                "definition": data.get("definition", "Definition not available."),
                "why": data.get("why", "Reason not provided."),
                "highlight": text
            }

    return {
        "text": text,
        "predictions": result
    }

# === Load parsed dataset for examples ===
BASE_DIR = Path(__file__).resolve().parents[2]
DATASET_PATH = BASE_DIR / "dataset" / "parsed_dataset.json"

try:
    with open(DATASET_PATH, "r", encoding="utf-8") as f:
        EXAMPLES = json.load(f)
    print(f"✅ Loaded {len(EXAMPLES)} examples from parsed_dataset.json")
except Exception as e:
    EXAMPLES = []
    print(f"❌ Failed to load dataset: {e}")

@app.get("/examples")
def get_examples(limit: int = 10):
    labeled = [ex for ex in EXAMPLES if "techniques" in ex and ex["techniques"]]
    return labeled[:limit]
