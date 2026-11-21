from fastapi import FastAPI, UploadFile
from fastapi.responses import FileResponse, HTMLResponse
from jinja2 import Environment, FileSystemLoader
from .media_ingest import ingest_folder_recursive
from .db import getCollection
import os

app = FastAPI()
col = getCollection()

@app.get("/media/{filename}", response_class=FileResponse)
async def serveImage(filename: str):
    return f"/media/{filename}"

SORT_QUERY={
    "date.year": 1,
    "date.month": 1,
    "date.day": 1,
    "date.hour": 1,
    "date.minute": 1,
    "date.second": 1
}

@app.get("/", response_class=HTMLResponse)
async def root(year: int = 0, month: int = 0, day: int = 0, typ: str = "all", page: int = 0, zoom: int = 3):
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

    env = Environment(loader=FileSystemLoader("."))
    template = env.get_template("index.jinja")
    output = template.render(data=media, count=count, page=page, year=year, month=month, day=day, typ=typ, zoom=zoom)

    return output

@app.post("/uploadfile/")
async def create_upload_file(myfile: UploadFile):
    INGEST_FOLDER = os.environ["INGEST_FOLDER"]
    if myfile.filename:
        destination = os.path.join(INGEST_FOLDER, myfile.filename)
        with open(destination, 'wb+') as saveFile:
            saveFile.write(myfile.file.read())
        return {"success":True}
    return {"error": "No filename."}

@app.post("/ingest")
def ingest():
    INGEST_FOLDER = os.environ["INGEST_FOLDER"]
    ingest_folder_recursive()
    for file in os.listdir(INGEST_FOLDER):
        os.remove(os.path.join(INGEST_FOLDER, file))
    return {"success": True}

@app.post("/drop")
def drop():
    col.drop()
    return {"success": True}
