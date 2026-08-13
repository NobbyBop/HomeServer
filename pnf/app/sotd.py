from datetime import datetime, timedelta, timezone
import json
import random

def getTrack():
    with open("/etc/pnfsotd/tracklist.json", "r") as f:
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

    with open("/etc/pnfsotd/tracklist.json", "w") as f:
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
    with open("/etc/pnfsotd/cache.json", "r") as f:
        try:
            content = f.read()
            cache = json.loads(content)
            return cache
        except:
            return {}

def writeCache(cache):
    with open("/etc/pnfsotd/cache.json", "w") as f:
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

    