from fastapi import FastAPI
from fastapi.responses import HTMLResponse
app = FastAPI()

@app.get("/", response_class=HTMLResponse)
def root():
    return """<!DOCTYPE html>
<html>
    <head>
        <title>Media Library</title>
    </head>
    <body>
        <h1>Media Library</h1>
    </body>
</html>"""
