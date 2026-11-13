from .media_ingest import ingest_folder_recursive
from fastapi import FastAPI
from functools import cmp_to_key
from .db import getCollection

col = getCollection()
app = FastAPI()

# Custom comparitor for sorting the media documents by date.
def compare(media_a: dict, media_b: dict) :
    a: dict | None = media_a["date"]
    b: dict | None = media_b["date"]
    
    if a is None and b is not None:
        return -1
    if a is not None and b is None:
        return 1
    if a is None and b is None:
        return 0

    if a is not None and b is not None:
        for attr in ["year", "month", "hour", "minute", "second"]:
            if a[attr] > b[attr]:
                return -1
            if a[attr] < b[attr]:
                return 1
    return 0

@app.get("/")
def root(year: int = 0, month: int = 0, day: int = 0, type: str = "all"):
    query = []
    if year != 0:
        query.append({"date.year": int(year)})
    if month != 0:
        query.append({"date.month": int(month)})
    if day != 0:
        query.append({"date.day": int(day)})
    if type != "all":
        query.append({"type": type})

    media = list(col.find({"$and": query}))
    media = sorted(media, key=cmp_to_key(compare))
    return media

@app.post("/rescan")
def rescan():
    ingest_folder_recursive()
    return {"success": True}

@app.post("/drop")
def drop():
    col.drop()
    return {"success": True}
