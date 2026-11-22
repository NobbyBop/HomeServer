# media-ingest.py

import os
import re
from .db import getCollection
from uuid import uuid4
import ffmpeg
from PIL import Image
import shutil

def _contains(word: str, substrings: list[str]):
    for sub in substrings:
        if sub in word:
            return True
    return False

def ingest_folder_recursive():
    INGEST_FOLDER = os.environ["INGEST_FOLDER"]
    MEDIA_FOLDER = os.environ["MEDIA_FOLDER"]
    found = []
    directories = [INGEST_FOLDER]
    while len(directories) > 0: 
        current_dir = directories.pop()
        found.append(current_dir)
        files = os.listdir(current_dir)
        for file in files:
            file_abs_path = os.path.join(current_dir, file)
            if os.path.isdir(file_abs_path):
                directories.append(file_abs_path)
    
    PHOTO_EXTS : list[str] = [".jpg",".jpeg",".gif",".png"]

    col = getCollection()

    for media_dir in found:
        print(f"Scanning: {media_dir}") 
        files: list[str] = os.listdir(media_dir)
        photos: list[str] = list(filter(lambda x: _contains(x.lower(), PHOTO_EXTS), files))
        dot_mov_files: list[str] = list(filter(lambda x: x.lower().endswith(".mov"), files))
        videos: list[str] = list(filter(lambda x: x.lower().endswith(".mp4"), files))

        # Note: dot_mov_files will contain live photos, so link and move live photos before other .mov files
        for media in [photos, videos, dot_mov_files]:
            for item in media:
                extIdx = item.rindex(".")
                filename_minus_ext = item[:extIdx]
                ext =  item[extIdx+1:]
                ext_lower = ext.lower()
                cur = {}
                item_path = os.path.join(media_dir, item)
                if ext_lower == "mp4" or ext_lower == "mov":
                    try:
                        datestr = ffmpeg.probe(item_path)["format"]["tags"]["creation_time"]
                        match = re.search(r"(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})", str(datestr))
                    except:
                        match = None
                else:
                    img = Image.open(item_path)
                    # 0x0132 is the well-known tag for DateTime
                    datestr = img.getexif().get(0x0132, "N/A")
                    match = re.search(r"(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})", str(datestr))
                    
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

                new_id = str(uuid4())
                new_path = os.path.join(MEDIA_FOLDER, new_id+"."+ext)

                # Move the ingested file into a the managed media folder with filename = id
                shutil.move(item_path, new_path)

                cur["_id"] = new_id
                cur["path"] = new_path
                cur["filename"] = new_id+"."+ext
                cur["type"] = "video" if (ext_lower == "mp4" or ext_lower == "mov") else "photo"
                cur["date"] = date
                cur["ext"] = ext_lower
                
                # Remove file extension and check if filename.MOV is in the live photo list.

                if ext_lower != "mov" and (filename_minus_ext+".MOV" in dot_mov_files or filename_minus_ext+".mov" in dot_mov_files):
                    if filename_minus_ext+".MOV" in dot_mov_files:
                        live_ext = "MOV"
                    else:
                        live_ext = "mov"

                    # remove it from being processed again later.
                    dot_mov_files.remove(filename_minus_ext+f".{live_ext}")
                    live_id = str(uuid4())
                    live_path = os.path.join(MEDIA_FOLDER, live_id+f".{live_ext}")

                    # Copy the live photo to the media folder.
                    try:
                        shutil.move(os.path.join(media_dir, filename_minus_ext+f".{live_ext}"), live_path)
                    except FileNotFoundError:
                        print(f"Warning: Duplicate image names, already assigned live photo '{filename_minus_ext+f".{live_ext}"}' to another image.")
                    
                    cur["live"] = os.path.join(MEDIA_FOLDER, str(live_id)+f".{live_ext}")
                    cur["live_ext"] = live_ext

                col.insert_one(cur)

"""
Reference
---

from PIL import Image
import ffmpeg

# Getting date from MP4
mp4 = "C:\\Users\\nicho\\Desktop\\media\\1518673c-dddc-4335-9d2b-710cb56eecc1.MP4"

probedata = ffmpeg.probe(mp4)
print(probedata["format"]["tags"]["creation_time"])

# Getting date from image.
jpeg = Image.open("C:\\Users\\nicho\\Desktop\\media\\00a50aee-f30d-4ffb-b71f-1299760f2f3e.JPEG")

exif_data = jpeg.getexif()

# 0x0132 is the well-known tag for DateTime
print("Date Taken:", exif_data.get(0x0132, "N/A"))
"""