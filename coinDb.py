import pandas as pd
from pymongo import MongoClient
import glob
import os

# -----------------------------
# MONGODB CONFIG
# -----------------------------
MONGO_URI = "mongodb+srv://dreamondreamer630:IMY320GroupProject@theclevercollector.v3sce3l.mongodb.net/"
DB_NAME = "coin_collection"
COLLECTION_NAME = "coins"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# -----------------------------
# CSV FILES CONFIG
# -----------------------------
csv_folder = "colnect_exports"  # Folder containing all your CSVs
csv_files = glob.glob(os.path.join(csv_folder, "*.csv"))

total_inserted = 0

for csv_file in csv_files:
    print(f"Processing file: {csv_file}")
    
    # Skip metadata lines, parse CSV
    df = pd.read_csv(
        csv_file,
        quotechar='"',
        skiprows=6,       # first 6 lines are metadata
        on_bad_lines='skip',
        engine='python'
    )
    
    print(f"Columns detected: {df.columns}")
    print(f"Number of rows loaded: {len(df)}")
    
    # Insert/update each coin
    for _, row in df.iterrows():
        coin = row.to_dict()
        
        # Use Ord Wc if available; fallback to Variant or combination of fields
        unique_id = coin.get("Ord Wc") or coin.get("Variant") or f"{coin.get('Country','Unknown')}_{coin.get('Issued on','Unknown')}_{coin.get('Name','Unknown')}"
        coin["_id"] = unique_id
        
        collection.update_one({"_id": coin["_id"]}, {"$set": coin}, upsert=True)
        total_inserted += 1

print(f"Finished importing all CSVs. Total coins inserted/updated: {total_inserted}")
