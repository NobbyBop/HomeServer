from .media_ingest import ingest_folder_recursive
from fastapi import FastAPI
from functools import cmp_to_key
from .db import getCollection

col = getCollection()
app = FastAPI()

SORT_QUERY={
    "date.year": 1,
    "date.month": 1,
    "date.day": 1,
    "date.hour": 1,
    "date.minute": 1,
    "date.second": 1
}

@app.get("/")
def root(year: int = 0, month: int = 0, day: int = 0, typ: str = "all", page:int = 0):
    filters = []
    if year != 0:
        filters.append({"date.year": int(year)})
    if month != 0:
        filters.append({"date.month": int(month)})
    if day != 0:
        filters.append({"date.day": int(day)})
    if typ != "all":
        filters.append({"type": typ})

    page_size = 48
    skip = page_size * int(page)

    query = {"$and": filters} if filters != [] else {}
    count = col.count_documents(query)
    media = list(col.find(query, sort=SORT_QUERY).skip(skip).limit(page_size))

    data = {"media": media, "count": count}

    return data

@app.post("/rescan")
def rescan():
    ingest_folder_recursive()
    return {"success": True}

@app.post("/drop")
def drop():
    col.drop()
    return {"success": True}
