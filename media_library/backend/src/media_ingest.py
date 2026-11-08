# media-ingest.py

import os
import re
from .db import getCollection

def _contains(word: str, substrings: list[str]):
    for sub in substrings:
        if sub in word:
            return True
    return False

def ingest_folder_recursive(base_dir: str):
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
    
    PHOTO_EXTS : list[str] = [".jpg",".jpeg",".gif",".png"]
    
    # List of photos and videos
    media : list[dict] = []
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
            cur["_id"] = photo_path
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
            cur["_id"] = video_path
            cur["path"] = video_path
            cur["filename"] = video
            cur["type"] = "video"
            cur["date"] = date
            
            media.append(cur)
    
    col = getCollection()
    col.insert_many(media)