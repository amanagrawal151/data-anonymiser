# from presidio_analyzer import AnalyzerEngine, PatternRecognizer, Pattern
# import re

# # Step 1: Create analyzer
# analyzer = AnalyzerEngine()

# # Step 2: Define custom recognizers for PII column names
# patterns = [
#     Pattern("Email pattern", r"\b(email|email id|e-mail)\b", 0.8),
#     Pattern("Phone pattern", r"\b(phone|mobile|contact number|phone number)\b", 0.8),
#     Pattern("Name pattern", r"\b(name|full name|first name|last name)\b", 0.8),
#     Pattern("Address pattern", r"\b(address|residence|home address|location)\b", 0.8),
#     Pattern("Aadhar pattern", r"\b(aadhar|aadhaar|uidai)\b", 0.8),
# ]

# custom_recognizer = PatternRecognizer(
#     supported_entity="CUSTOM_PII", patterns=patterns
# )

# # Step 3: Add recognizer to analyzer
# analyzer.registry.add_recognizer(custom_recognizer)

# # Step 4: Test with your column names
# columns = ["name", "email id", "transaction id", "model no", "phone number", "address", "aman", "aman@gmail.com"]
# pii_columns = []

# for col in columns:
#     results = analyzer.analyze(text=col, language="en")
#     if results:  # If Presidio found something
#         pii_columns.append(col)

# print(pii_columns)





# modify dataset to have label

import pandas as pd
from presidio_analyzer import AnalyzerEngine

def analyze_pii(value, analyzer):
    """Return True if value contains PII, else False."""
    if not isinstance(value, str) or value.strip() == "":
        return False
    results = analyzer.analyze(text=value, language="en")
    return len(results) > 0

def process_csv_with_pii_labels(input_csv, output_csv):
    df = pd.read_csv(input_csv, dtype=str).fillna("")
    analyzer = AnalyzerEngine()

    new_cols = []
    for col in df.columns:
        label_col = f"{col}_label"
        # Analyze each value in the column
        df[label_col] = df[col].apply(lambda x: analyze_pii(x, analyzer))
        new_cols.append(col)
        new_cols.append(label_col)

    # Reorder columns: after each original column, its label column
    df = df[new_cols]
    df.to_csv(output_csv, index=False)
    print(f"PII-labeled CSV saved to {output_csv}")

if __name__ == "__main__":
    process_csv_with_pii_labels("pii-detection-model/data/pii_synthetic_dataset_gpt2.csv", "pii-detection-model/pii_synthetic_dataset_gpt2_labeled.csv")