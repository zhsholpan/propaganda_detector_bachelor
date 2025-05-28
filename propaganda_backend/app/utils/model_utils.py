import os
import joblib
import numpy as np
from keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_DIR = BASE_DIR / "app" / "model"

# === Model loading ===
def load_tokenizer():
    return joblib.load(MODEL_DIR / "tokenizer_propaganda-2.pickle")

def load_label_encoder():
    return joblib.load(MODEL_DIR / "label_encoder.pickle")

def load_propaganda_model():
    return load_model(MODEL_DIR / "final_propaganda_model-2.keras")

# === Preprocessing ===
def preprocess_text(text, tokenizer, maxlen=200):
    seq = tokenizer.texts_to_sequences([text])
    return pad_sequences(seq, maxlen=maxlen)

# === Why-detected explanations per technique ===
def get_detection_reason(label):
    reasons = {
        "Loaded Language": "Uses emotionally charged or biased terms to influence perception.",
        "Appeal To Fear": "Attempts to instill fear or urgency to influence decision-making.",
        "Flag-Waving": "Appeals to national pride or identity to justify actions or beliefs.",
        "Stereotyping": "Oversimplifies or generalizes a group to influence opinion.",
        "Appeal To Authority": "References experts or authorities to add weight without justification.",
        "Causal Oversimplification": "Blames complex issues on simple or single causes.",
        "Doubt": "Questions trust and introduces emotional uncertainty.",
        "Exaggeration,Minimisation": "Overstates or downplays facts to manipulate the audience.",
        "Name Calling,Labeling": "Attaches negative labels to opponents or groups.",
        "Repetition": "Repeats certain ideas or phrases to reinforce a message."
    }
    return reasons.get(label, "This part of the sentence uses emotionally charged or manipulative language.")
