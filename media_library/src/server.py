from fastapi import FastAPI, UploadFile, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import FileResponse, HTMLResponse
from .media_ingest import ingest_folder_recursive
from .db import getCollection
import math
import os

app = FastAPI()
templates = Jinja2Templates("web")
col = getCollection()

SUCCESS = {"success": True}

def ERROR(msg):
    return {"error": msg}

MEDIA_FOLDER = os.environ["MEDIA_FOLDER"]

@app.get("/web/{filename}", response_class=FileResponse)
async def serveWebFile(filename: str):
    return f"web/{filename}"

@app.get(os.path.join(MEDIA_FOLDER, "{filename}"), response_class=FileResponse)
async def serveImage(filename: str):
    return os.path.join(MEDIA_FOLDER, f"{filename}")

SORT_QUERY={
    "date.year": 1,
    "date.month": 1,
    "date.day": 1,
    "date.hour": 1,
    "date.minute": 1,
    "date.second": 1
}

@app.get("/", response_class=HTMLResponse)
async def root(request: Request, year: int = 0, month: int = 0, day: int = 0, typ: str = "all", page: int = 1, zoom: int = 3):
    filters = []
    if year != 0:
        filters.append({"date.year": int(year)})
    if month != 0:
        filters.append({"date.month": int(month)})
    if day != 0:
        filters.append({"date.day": int(day)}) 
    if typ != "all":
        filters.append({"type": typ})

    query = {"$and": filters} if filters != [] else {}
    count = col.count_documents(query)
    page_size = 75
    max_page = max(1, math.ceil(count/page_size))

    if page < 1:
        page = 1
    if page > max_page:
        page = max_page

    skip = page_size * int(page-1)
    media = list(col.find(query, sort=SORT_QUERY).skip(skip).limit(page_size))

    return templates.TemplateResponse(
        request=request, 
        name="index.jinja", 
        context={"data":media, "count":count, "page":page, "max_page":max_page, "year":year, "month":month, "day":day, "typ":typ, "zoom":zoom}
    )

@app.post("/uploadfile/")
async def upload_file(myfile: UploadFile):
    INGEST_FOLDER = os.environ["INGEST_FOLDER"]
    if myfile.filename:
        print(f"Got file: {myfile.filename}")
        destination = os.path.join(INGEST_FOLDER, myfile.filename)
        with open(destination, 'wb+') as saveFile:
            saveFile.write(myfile.file.read())
        return {"success":True}
    return ERROR("No filename.")

@app.post("/ingest")
async def ingest():
    INGEST_FOLDER = os.environ["INGEST_FOLDER"]
    try:
        ingest_folder_recursive()
    except:
        return ERROR("Upload failed")
    return SUCCESS

@app.post("/drop")
async def drop():
    MEDIA_FOLDER = os.environ["MEDIA_FOLDER"]
    INGEST_FOLDER = os.environ["INGEST_FOLDER"]

    for file in os.listdir(INGEST_FOLDER):
        os.remove(os.path.join(INGEST_FOLDER, file))

    for file in os.listdir(MEDIA_FOLDER):
        os.remove(os.path.join(MEDIA_FOLDER, file))

    col.drop()

    return SUCCESS

@app.post("/delete")
async def delete(request: Request):
    data = await request.json()
    res = col.delete_one({"path": data["path"]})
    os.remove(data["path"])

    return SUCCESS

@app.post("/log")
async def log(request: Request):
    data = await request.json()
    print("LOG: " + data["msg"])
    return SUCCESS