# Media Server
The goal of this project is to serve my own photo and video library over LAN. Ultimately I would like for this to serve as a replacement for cloud hosted photos/videos.

## Goal: Version 0
A first draft of this would look like:
- [x] Dump iCloud photos here 
- [x] Parsed and sorted by date
- [x] Use a database (MongoDB makes the most sense here), not a JSON file.
- [x] Need to figure out how I will host images (in this container, outside? not sure what is best yet.)
- [x] Stop using regex to parse date, use python library - it's way too slow.
- [x] Displayed on a local HTML page (can download, view, etc.)
	- [x] Paginated results are needed (I think from backend would be ideal.) Default 50.
	- [x] Forgot I need to render videos somehow LOL
- [x] Make it look nice!

## Goal: Version 1
Beyond viewing, I want to add upload support so I can upload files from any device (it will likely be coming from my phone, not my computer).
- [x] Upload support
    - [ ] Support large quantities of files at once. (Looks like I will need to do streaming for this. Possibly one stream per file and then close the stream, or stream all the files at once until they are done.)
- [ ] When ingesting, put media into folders like `YYYY/MM/` or `Undated`
    - [x] Also, need to delete the ingest folder once it is uploaded to the media folder.
- [ ] Might be worth a look into how I would be able to find dates on PNGs. Apple definitely has them saved somehow...

## Field Notes

### 11/05/2026
- On my first day of developing this, I build the parser and the sorter. I ran into a few problems I didn't expect. 
- To parse the date, I borrowed a technique I found online and instead of using an image library, I just used regex in the actual bytes of the image. That seems to get the same dates I can see in the Windows File Explorer.
- I didn't realize that there would be duplicate names in images. I have stuff in iCloud uploaded from all over the place, so it does make sense.
	- If you combine all the images into one folder, you get a scenario like this:
		- The compiled folder contains `img-a.jpg`, `img-a.png`, and `img-a.mov`.
		- the `.mov` is the Apple Live Photo. The problem is that once you compile the images together you can't tell whether `img-a.mov` belongs to `img-a.jpg` or `img-a.png`.
- So, instead I allowed folders to be searched recursively and added that logic into the parser.

## 11/07/2026
- I spent most of today trying to create a Docker Compose arrangement for a backend API.
- I refactored my existing `media_ingest.py` to work with my new MongoDB.
- I battled for so long with a bug I still only partially understand.
	- Basically, to run the API server, I opted for FastAPI because I thought it would get my server up quickly and easily.
	- To run a server, you don't just `python server.py`, you have to run `python -m fastapi run server.py`, and I believe this is the source of the bug.
	- I have all my my python files in one package `src/`, and they import from each other.
		- When I am running a file directly (e.g. `python server.py` I get `ImportError: attempted relative import with no known parent package`)
		- BUT, when running it through the FastAPI module, it works fine.
		- I suspect that they are somehow interpreting the package differently, but I have no more bandwidth.
		- It works in both Docker and Windows now, so I am not going to chase down the issue anymore.
	- I don't even care about running it in Windows, but I want the `.venv` so that I get type checking on all the modules. 

## 11/13/2026
- Since my last update, I converted the date parsing to use `ffmpeg` and `PIL` for videos and images respectively.
- I added basic querying to `GET /` via query params.
- Now my only remaining step towards v0 is to make a frontend to serve the images and allow you to filter them!
	- Frontend needs to serve all images from `MEDIA_FOLDER`.
- Along the way I fixed some small bugs in the `media_ingest.py` file. 
- Once I reach v0 I will want to add a way to do upload/delete, then I'll call it done at v1, and it will actually be a living photo album on my home server!

## 11/16/2026
- Ok so I guess I am technically done with v0, except it still looks really ugly haha.
- I implmented pagination, filtering on the frontend, and video players today. Big success!
	- At this point the website is actually usable for searching through my photos and videos which is really cool.
- I've been having a really good time with this, it is nice to be working on a project over a little loner period of time, with a clear end goal in mind.
- During my next session I will focus on a more robust UI and just trying to make it a bit more error resistant and presentable.
	- I'll limit that to one session because I do want to implement the version 1 things like upload and delete so I can actually start using this.

## 11/17/2026
- Made images appear in a grid, and added zoom functionality to adjust the number of columns.
- This is definitely good enough for now and I can refine more once the rest of the functionality is done!

## 11/18/2026
- Began the work on file uploading.
	- Currently having trouble bridging the gap between the browser and the frontend server with Files
	- I keep running into `422 Unprocessable Content`. I think this is a FastAPI thing. I am wondering if I should have just done it in Javascript with express. But I will figure it out, just not tonight.

## 11/19/2026
- I spent probably an hour trying to figure this out, combing through Stack Overflow, and I ALMOST made the following post:
"I have been trying to upload an image to a FastAPI server, unsuccessfully. I have already seen threads about this but the solutions haven't worked. I have read a bunch of similar threads and found that their solutions didn't work for me, although I am trying to stick as close to the docs as possible.Here is my current state:

### Client-Side - referencing this thread

```
<div>
    <input id="file_input" type="file" multiple/>
    <button onclick="upload()">Upload</button>
    <p id="upload_message"></p>
</div>
```
```
function upload() {
    files = document.getElementById("file_input").files
    console.log(files) // FileList[File] - I have verified this is the correct object
    if (files.length == 0) {
        document.getElementById("upload_message").textContent = "Error: You must select file(s)."
    } else {
        document.getElementById("file_input").value = null
        document.getElementById("upload_message").textContent = "Your file(s) have been sent to the backend."
        for(let file of files){
            fetch("http://localhost:8001/uploadfile/", {
                method: "POST",
                // Have read here that Content-Type should be omitted.
                body: file
            })
        }
    }
}
```
### Server - straight from FastAPI docs

```
@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}
```

422 - Unprocessable Content

### Other Things I Have Tried:

```
@app.post("/uploadfile/")
async def create_upload_file(request: Request):
    body = await request.body()
    return body
```
This got me a bit closer - I am able to print the raw body, but decoding fails on return. I have also tried request.json() but that fails with a decoding error.

```
<form action="http://localhost:8001/uploadfile/", method="post">
    <input id="file_input" type="file" multiple/>
    <button type="submit">Upload</button>
</form>
```

Tried sending it as form data as well but this also gave me 422 - Unprocessable Content.When I send as form data it says "No Request Data", when I send the File object as the body I do see the File contents as the request body but still get unprocessable data. I've tried with txt, jpg, pdf, all the same result.

I've been checking the network tab to see how the files get sent, because I've also read I need to match the parameter name to the request.
```
fetch("http://localhost:8001/uploadfile/", {
                method: "POST",
                body: JSON.stringify({"myfile": file}) 
            })
```

Also tried {myfile: file} directly, and of course matching that in the server parameter, still no luck although this gives me a 501.Would greatly appreciate a point in the right direction. Thanks!"
- But! I actually got it to work with this:
```
let data = new FormData()
data.append("myfile", files[0])
fetch("http://localhost:8001/uploadfile/", {
	method: "POST",
	body: data
})
```
- Which is stupid. I hate FastAPI. I wish I did not build with it. JavaScript express is so much better. But here we are.

## 11/20/2026
- I got the file uploads to work (mostly, they seem to hang when you do too many. I think it might be a browser limitation, but can't confirm for sure yet.)
- I also decided it was not really necessary to separate the frontend and backend because it is one simple DB request, and everything is running on my local machine anyway.
    - Now all the behavior is in one place, it is easier to iterate and change. Fewer docker services, less overhead on calls.
    - Obviously this is not a great standard, but mongo DB is basically the backend in and of itself, so I am fine with this.