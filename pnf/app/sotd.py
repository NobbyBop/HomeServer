from datetime import datetime, timedelta, timezone
import json
import os
import random

DATA_DIR = os.environ.get("PNFSOTD_DATA_DIR", "/etc/pnfsotd")

def getTrack():
    with open(os.path.join(DATA_DIR, "tracklist.json"), "r") as f:
        try:
            content = f.read()
            tracklist = json.loads(content)
        except:
            return {
                "name":"Not found",
                "image":"Not found",
                "altText":"Not found",
                "url":"Not found",
                "artists":"Not found",
            }
    if len(tracklist["new"]) == 0:
        print("Tracklist exhausted, reshuffling.")
        random.shuffle(tracklist["used"])
        tracklist["new"] = tracklist["used"]
        tracklist["used"] = []
    track = tracklist["new"].pop()
    tracklist["used"].append(track)

    with open(os.path.join(DATA_DIR, "tracklist.json"), "w") as f:
        f.write(json.dumps(tracklist))

    return track
        
def cacheEvict(cache):
    to_delete = []
    for entry in cache:
        if cache[entry]["evict"] < datetime.now(timezone.utc).timestamp():
            to_delete.append(entry)
    for entry in to_delete:
        del cache[entry]
    return cache

def loadCache():
    with open(os.path.join(DATA_DIR, "cache.json"), "r") as f:
        try:
            content = f.read()
            cache = json.loads(content)
            if _is_legacy_entry(cache):
                now = datetime.now(timezone.utc)
                user_date = f"{now.year}-{now.month}-{now.day}"
                cache = {user_date: {
                    "name": cache["name"],
                    "image": cache["image"],
                    "altText": cache["altText"],
                    "url": cache["url"],
                    "artists": cache["artists"],
                    "evict": (now + timedelta(days=5)).timestamp(),
                }}
                writeCache(cache)
            return cache
        except:
            return {}

def _is_legacy_entry(cache):
    return isinstance(cache, dict) and "name" in cache and "evict" not in cache

def writeCache(cache):
    with open(os.path.join(DATA_DIR, "cache.json"), "w") as f:
        f.write(json.dumps(cache))
    
def getSongOfTheDay(utc_offset):
    
    userTime = datetime.now(timezone.utc) + timedelta(hours=utc_offset)
    evictionTime = datetime.now(timezone.utc) + timedelta(days=5)
    year = userTime.year
    month = userTime.month
    day = userTime.day

    userDate = f"{year}-{month}-{day}"

    cache = loadCache()
    cache = cacheEvict(cache)
    if userDate in cache:
        print("Cache hit.")
        return cache[userDate]
    else:
        print("Cache miss.")
        # Get song or whatever here...
        track = getTrack()
    
        cacheEntry = {
            "name":track["name"],
            "image":track["image"],
            "altText":track["altText"],
            "url":track["url"],
            "artists":track["artists"],
            "evict":evictionTime.timestamp()
        }
        cache[userDate] = cacheEntry
        writeCache(cache)
        return cacheEntry

    