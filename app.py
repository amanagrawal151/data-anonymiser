from presidio_analyzer import AnalyzerEngine, PatternRecognizer, Pattern
import re

# Step 1: Create analyzer
analyzer = AnalyzerEngine()

# Step 2: Define custom recognizers for PII column names
patterns = [
    Pattern("Email pattern", r"\b(email|email id|e-mail)\b", 0.8),
    Pattern("Phone pattern", r"\b(phone|mobile|contact number|phone number)\b", 0.8),
    Pattern("Name pattern", r"\b(name|full name|first name|last name)\b", 0.8),
    Pattern("Address pattern", r"\b(address|residence|home address|location)\b", 0.8),
    Pattern("Aadhar pattern", r"\b(aadhar|aadhaar|uidai)\b", 0.8),
]

custom_recognizer = PatternRecognizer(
    supported_entity="CUSTOM_PII", patterns=patterns
)

# Step 3: Add recognizer to analyzer
analyzer.registry.add_recognizer(custom_recognizer)

# Step 4: Test with your column names
columns = ["name", "email id", "transaction id", "model no", "phone number", "address", "aman", "aman@gmail.com"]
pii_columns = []

for col in columns:
    results = analyzer.analyze(text=col, language="en")
    if results:  # If Presidio found something
        pii_columns.append(col)

print(pii_columns)
