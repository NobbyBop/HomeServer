from fastapi import FastAPI
from fastapi.responses import FileResponse
import os

app = FastAPI()

@app.get("/{filename}", response_class=FileResponse)
def serveImage(filename: str):
    return os.path.join(os.environ.get("MEDIA_FOLDER", "/media/"), filename)
        

@app.get("/", response_class=FileResponse)
def root():
    return "index.html"
