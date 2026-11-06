# media-ingest.py

import os
import sys
import re
import json
from pathlib import Path

"""
Goal: loop through folder, extract date
If .JPG, find if there is an associated live photo .MOV
Videos are stored as MP4 on ICloud

I will store a JSON file, a list of these objects:
{
    path: str
    filename: str,
    type: photo | video,
    live?: str (path)
    date: {
        year: int,
        month: int,
        day: int,
        hour: int,
        minute: int,
        second: int,
    } | None
}

"""

def _contains(word, substrings):
    for sub in substrings:
        if sub in word:
            return True
    return False

"""
This is a starting directory, it should go into all folders inside recursively and do the following:
1. Generate a media list for that folder, including getting live photo links
2. Photos can be added in folders if desired, since folders enforce name uniqueness.
3. This will make it easy to export from iCloud in the future, just download and drop the folder into the media store.
"""

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: media-ingest.py <path>")
        exit(1)
    
    base_dir = Path(sys.argv[1])
    base_dir = str(base_dir.absolute()).strip('"')
    
    # Scan dir for subdirectories - we will check all of them for photos and videos.
    # Note, these are absolute paths
    found = []
    directories = [base_dir]
    while len(directories) > 0: 
        current_dir = directories.pop()
        found.append(current_dir)
        files = os.listdir(current_dir)
        for file in files:
            file_abs_path = os.path.join(current_dir, file)
            if os.path.isdir(file_abs_path):
                directories.append(file_abs_path)
    
    PHOTO_EXTS = [".jpg",".jpeg",".gif",".png"]
    
    # List of photos and videos
    media = []
    for media_dir in found:
        print(f"Scanning: {media_dir}") 
        files = os.listdir(media_dir)
        photos = list(filter(lambda x: _contains(x.lower(), PHOTO_EXTS), files))
        live_photos = list(filter(lambda x: x.lower().endswith(".mov"), files))
        videos = list(filter(lambda x: x.lower().endswith(".mp4"), files))

        for photo in photos:
            cur = {}
            photo_path = os.path.join(media_dir, photo)
            with open(photo_path, 'rb') as load_photo:
                content = load_photo.read(2000)
                # PNGs do not carry byte-accessible metadata like this.
                # Acceptable for now as these are only downloaded images/screenshots, not photos.
                match = re.search(r"(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})", str(content))
                if not match:
                    date = None
                else:
                    date = {
                        "year":int(match.group(1)),
                        "month":int(match.group(2)),
                        "day":int(match.group(3)),
                        "hour":int(match.group(4)),
                        "minute":int(match.group(5)),
                        "second":int(match.group(6))
                    }
            cur["path"] = photo_path
            cur["filename"] = photo
            cur["type"] = "photo"
            cur["date"] = date
            
            # Remove file extension and check if filename.MOV is in the live photo list.
            extIdx = photo.rindex(".")
            photo_minus_ext = photo[:extIdx]
            if photo_minus_ext+".MOV" in live_photos:
                cur["live"] = os.path.join(media_dir, photo_minus_ext+".MOV")
            
            media.append(cur)

        for video in videos:
            cur = {}
            video_path = os.path.join(media_dir, video)
            with open(video_path, 'rb') as load_video:
                content = load_video.read()
                # MP4s use a different timestamp format. Represented here.
                match = re.search(r"(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})", str(content))
                if not match:
                    date = None
                else:
                    date = {
                        "year":int(match.group(1)),
                        "month":int(match.group(2)),
                        "day":int(match.group(3)),
                        "hour":int(match.group(4)),
                        "minute":int(match.group(5)),
                        "second":int(match.group(6))
                    }
            cur["path"] = video_path
            cur["filename"] = video
            cur["type"] = "video"
            cur["date"] = date
            
            media.append(cur)
                
    with open("media.json", 'w') as mediafile:
        mediafile.write(json.dumps(media))
"""
Dumping old code for reference for now:

Get all extensions:


exts = []
for file in files:
    extIdx = file.rindex(".")
    ext = file[extIdx:]
    if ext not in exts:
        exts.append(ext)
print(exts)

"""