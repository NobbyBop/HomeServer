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
def root(year: int = 0, month: int = 0, day: int = 0, type: str = "all"):
    
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
    if type != "all":
        query+=("?" if queryCount == 0 else "&")+f"type={type}"
        queryCount+=1

    data = requests.get(os.environ.get("BACKEND_URL", "http://localhost:8000")+query)

    env = Environment(loader=FileSystemLoader("."))
    template = env.get_template("index.jinja")
    output = template.render(data=data.json())

    return output
