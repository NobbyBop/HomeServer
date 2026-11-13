# Media Server
The goal of this project is to serve my own photo and video library over LAN. Ultimately I would like for this to serve as a replacement for cloud hosted photos/videos.

## Goal: Version 0
A first draft of this would look like:
- [x] Dump iCloud photos here 
- [x] Parsed and sorted by date
- [x] Use a database (MongoDB makes the most sense here), not a JSON file.
- [x] Need to figure out how I will host images (in this container, outside? not sure what is best yet.)
- [ ] Stop using regex to parse date, use python library - it's way too slow.
- [ ] Displayed on a local HTML page (can download, view, etc.)

## Goal: Version 1
Beyond viewing, I want to add upload support so I can upload files from any device (it will likely be coming from my phone, not my computer).

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
