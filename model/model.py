import pandas as pd
import re
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

# 1. Load dataset
df = pd.read_csv("pii_gemini.csv")

print(df.head())
# Assuming columns like: "text", "label" (1 = PII, 0 = not PII)

# 2. Split dataset
X = df["Essay"]
y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Build pipeline (Bag of Words + Logistic Regression)
model = Pipeline([
    ("vectorizer", CountVectorizer(ngram_range=(1,2))),
    ("classifier", LogisticRegression(max_iter=200))
])

# 4. Train
model.fit(X_train, y_train)

# 5. Evaluate
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

# 6. Function to flag words in input array
def flag_pii(texts):
    results = []
    for text in texts:
        tokens = text.split()
        flagged = []
        for word in tokens:
            if model.predict([word])[0] == 1:  # If flagged as PII
                flagged.append(word)
        results.append({"text": text, "pii": flagged})
    return results

# Example test
input_array = [
    "My name is Vishal Sharma",
    "Email me at test@example.com",
    "I live in Bangalore"
]

print(flag_pii(input_array))
