# Home Server v2
In this new iteration of my home server, I am shifting the focus away from Internet-facing applications. I will add services that run over LAN only, with my Raspberry Pi 5 as the host. I will add services as I need them, probably don't need Docker yet but maybe in the future.

## Photo Library
Goal - build my own photo library from iCloud, host images myself.

### Progress
- Wrote a media parser for iCloud images types
- Had to download iCloud images in groups of 1000
- Problem: duplicate names across each folder of 1000
	- I tried to combine all of them into a folder, adding (1) (2) to duplicate names
	- There is a problem I didn't think of: IMG-A.jpg from folder A is not a duplicate of IMG-A.jpeg from folder B.
	- When I scan for live photos for IMG-A.jpg I look for IMG-A.MOV.
	- BUT: That lists the live photo as being for both IMG-A.jpg and IMG-A.jpeg. So I can't do that.
	- I have to go folder by folder, pair up everything, and then rename everything to UUIDs.
	- Hypothesis, the collision described above only happens when merging folders. If that is true then I only need to keep files in their original folders and search recursively to get the live photo to original mapping.
