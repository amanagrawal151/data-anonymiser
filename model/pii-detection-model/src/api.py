from fastapi import FastAPI
from pydantic import RootModel
from typing import Dict, List
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification
import torch

app = FastAPI()

MODEL_PATH = "pii_bert"
tokenizer = DistilBertTokenizerFast.from_pretrained(MODEL_PATH)
model = DistilBertForSequenceClassification.from_pretrained(MODEL_PATH)

class PIIRequest(RootModel[Dict[str, List[str]]]):
    pass

@app.post("/detect-pii")
def detect_pii(request: PIIRequest) -> Dict[str, List[dict]]:
    data = request.root
    result = {}
    for col, values in data.items():
        if not values:
            result[col] = [{}, {"count": 0}]
            continue
        inputs = tokenizer(values, truncation=True, padding=True, max_length=64, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)
            preds = torch.argmax(outputs.logits, dim=1).numpy()
        count_true = sum(bool(pred) for pred in preds)
        word_map = {word: bool(pred) for word, pred in zip(values, preds)}
        result[col] = [word_map, {"count": count_true}]
    return result