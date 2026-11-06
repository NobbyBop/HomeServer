# Media Server
The goal of this project is to serve my own photo and video library over LAN. Ultimately I would like for this to serve as a replacement for cloud hosted photos/videos.

## Goal: Version 0
A first draft of this would look like:
- [x] Dump iCloud photos here 
- [x] Parsed and sorted by date
- [ ] Displayed on a local HTML page (can download, view, etc.)

## Goal: Version 1
Beyond viewing, I want to add upload support so I can upload files from any device (it will likely be coming from my phone, not my computer).
- [ ] Use a database (MongoDB makes the most sense here), not a JSON file.

## Field Notes

### 11/05/2026
- On my first day of developing this, I build the parser and the sorter. I ran into a few problems I didn't expect. 
- To parse the date, I borrowed a technique I found online and instead of using an image library, I just used regex in the actual bytes of the image. That seems to get the same dates I can see in the Windows Explorer.
- I didn't realize that there would be duplicate names in images. I have stuff in iCloud uploaded from all over the place, so it does make sense.
	- If you combine all the images into one folder, you get a scenario like this:
		- The compiled folder contains `img-a.jpg`, `img-a.png`, and `img-a.mov`.
		- the `.mov` is the Apple Live Photo. The problem is that once you compile the images together you can't tell whether `img-a.mov` belongs to `img-a.jpg` or `img-a.png`.
- So, instead I allowed folders to be searched recursively and added that logic into the parser.