import random
import string
import json
import pandas as pd
from faker import Faker

# English + French faker
fake_en = Faker("en_US")
fake_fr = Faker("fr_FR")

# Define the fields you want
PII_FIELDS = [
  "full name",
  "alias",
  "account name",
  "social security number",
  "taxpayer identification number",
  "national id number",
  "passport number",
  "drivers license number",
  "government id number",
  "certificate number",
  "professional license number",
  "medical record number",
  "health plan beneficiary number",
  "financial account number",
  "bank account number",
  "credit card number",
  "debit card number",
  "account number",
  "email address",
  "phone number",
  "fax number",
  "physical address",
  "geolocation data",
  "ip address",
  "device serial number",
  "mac address",
  "personal web url",
  "unique personal identifier",
  "biometric identifiers",
  "vehicle registration number",
  "employment information",
  "browsing history",
  "search history",
  "internet activity",
  "app interactions",
  "website interactions",
  "inferences profile",
  "unique identifying code"
]

def random_identifier(length=10):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

def random_mac():
    return ":".join(f"{random.randint(0, 255):02x}" for _ in range(6))

def random_geo():
    return f"{round(random.uniform(-90,90),6)}, {round(random.uniform(-180,180),6)}"

def random_activity():
    actions = ["clicked", "searched", "visited", "liked", "downloaded", "shared"]
    sites = ["example.com", "mysite.fr", "newsportal.com", "shoponline.net"]
    return f"{random.choice(actions)} {random.choice(sites)}"

def generate_pii_row():
    faker = random.choice([fake_en, fake_fr])
    return {
        "full name": faker.name(),
        "alias": faker.user_name(),
        "account name": faker.user_name(),
        "social security number": f"{random.randint(100,999)}-{random.randint(10,99)}-{random.randint(1000,9999)}",
        "taxpayer identification number": random_identifier(9),
        "national id number": random_identifier(12),
        "passport number": random_identifier(8),
        "drivers license number": random_identifier(10),
        "government id number": random_identifier(12),
        "certificate number": random_identifier(15),
        "professional license number": random_identifier(8),
        "medical record number": random_identifier(12),
        "health plan beneficiary number": random_identifier(10),
        "financial account number": str(random.randint(10**11, 10**12-1)),
        "bank account number": str(random.randint(10**9, 10**10-1)),
        "credit card number": faker.credit_card_number(),
        "debit card number": faker.credit_card_number(card_type="mastercard"),
        "account number": str(random.randint(100000, 999999)),
        "email address": faker.email(),
        "phone number": faker.phone_number(),
        "fax number": f"+{random.randint(1,99)}-{random.randint(1000000000,9999999999)}",
        "physical address": faker.address().replace("\n", ", "),
        "geolocation data": random_geo(),
        "ip address": faker.ipv4(),
        "device serial number": random_identifier(12),
        "mac address": random_mac(),
        "personal web url": faker.url(),
        "unique personal identifier": random_identifier(16),
        "biometric identifiers": random.choice(["fingerprint_hash", "iris_scan_code", "face_id"]),
        "vehicle registration number": random_identifier(7),
        "employment information": f"{faker.job()} at {faker.company()}",
        "browsing history": random_activity(),
        "search history": random_activity(),
        "internet activity": random_activity(),
        "app interactions": random_activity(),
        "website interactions": random_activity(),
        "inferences profile": random.choice(["sports lover", "tech enthusiast", "traveler", "shopper"]),
        "unique identifying code": random_identifier(20),
    }

def generate_dataset(n=1000, save_as="pii_dataset.csv"):
    data = [generate_pii_row() for _ in range(n)]
    df = pd.DataFrame(data)
    df.to_csv(save_as, index=False)
    df.to_json(save_as.replace(".csv", ".json"), orient="records", indent=2)
    print(f"✅ Generated {n} rows at {save_as} and {save_as.replace('.csv', '.json')}")

# Example usage
if __name__ == "__main__":
    generate_dataset(1050)  # change number of rows here