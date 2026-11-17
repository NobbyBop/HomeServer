from fastapi import FastAPI
from fastapi.responses import FileResponse, HTMLResponse
from jinja2 import Environment, FileSystemLoader
import requests
import os

app = FastAPI()
     
@app.get("/media/{filename}", response_class=FileResponse)
def serveImage(filename: str):
    return f"/media/{filename}"
        
@app.get("/", response_class=HTMLResponse)
def root(year: int = 0, month: int = 0, day: int = 0, typ: str = "all", page: int = 0):
    queryCount = 0
    query = ""
    if year != 0:
        query+=("?" if queryCount == 0 else "&")+f"year={year}"
        queryCount+=1
    if month != 0:
        query+=("?" if queryCount == 0 else "&")+f"month={month}"
        queryCount+=1
    if day != 0:
        query+=("?" if queryCount == 0 else "&")+f"day={day}"
        queryCount+=1
    if typ != "all":
        query+=("?" if queryCount == 0 else "&")+f"typ={typ}"
        queryCount+=1
    if page != 0:
        query+=("?" if queryCount == 0 else "&")+f"page={page}"
        queryCount+=1

    data = requests.get(os.environ.get("BACKEND_URL", "http://localhost:8000")+query)

    data = data.json()
    media = data["media"]
    count = data["count"]

    env = Environment(loader=FileSystemLoader("."))
    template = env.get_template("index.jinja")
    output = template.render(data=media, count=count, page=page, year=year, month=month, day=day, typ=typ)

    return output
