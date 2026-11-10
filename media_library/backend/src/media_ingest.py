# media-ingest.py

import os
import re
from .db import getCollection
from uuid import uuid4

def _contains(word: str, substrings: list[str]):
    for sub in substrings:
        if sub in word:
            return True
    return False

def ingest_folder_recursive():
    found = []
    directories = [os.environ.get("INGEST_FOLDER", "C:\\Users\\nicho\\Desktop\\ingest\\")]
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
    new_folder = os.environ.get("MEDIA_FOLDER", "C:\\Users\\nicho\\Desktop\\media")

    for media_dir in found:
        print(f"Scanning: {media_dir}") 
        files: list[str] = os.listdir(media_dir)
        photos: list[str] = list(filter(lambda x: _contains(x.lower(), PHOTO_EXTS), files))
        live_photos: list[str] = list(filter(lambda x: x.lower().endswith(".mov"), files))
        videos: list[str] = list(filter(lambda x: x.lower().endswith(".mp4"), files))

        for media in [photos, videos]:
            for item in media:
                extIdx = item.rindex(".")
                filename_minus_ext = item[:extIdx]
                ext =  item[extIdx+1:]
                cur = {}
                item_path = os.path.join(media_dir, item)
                with open(item_path, 'rb') as load_item:
                    content = load_item.read()
                    if ext == "mp4":
                        match = re.search(r"(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})", str(content))
                    else:
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

                    new_id = str(uuid4())

                    new_path = os.path.join(new_folder, new_id+"."+ext)
                    # Copy the ingested file into a the managed media folder with filename = id
                    with open(new_path, 'wb') as copy:
                        copy.write(content)

                cur["_id"] = new_id
                cur["path"] = new_path
                cur["filename"] = item
                cur["type"] = "video" if ext == "mp4" else "photo"
                cur["date"] = date
                
                # Remove file extension and check if filename.MOV is in the live photo list.
                if filename_minus_ext+".MOV" in live_photos:
                    live_id = str(uuid4())
                    live_path = os.path.join(new_folder, live_id+".MOV")
                    # Copy the live photo to the media folder.
                    with open(live_path, 'wb') as copy:
                        copy.write(content)
                    cur["live"] = os.path.join(new_folder, str(live_id)+".MOV")

                col.insert_one(cur)