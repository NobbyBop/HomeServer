from datetime import datetime, timedelta, timezone
import json

def cacheEvict(cache):
    to_delete = []
    for entry in cache:
        if cache[entry]["evict"] < datetime.now(timezone.utc).timestamp():
            to_delete.append(entry)
    for entry in to_delete:
        del cache[entry]
    return cache

def loadCache():
    with open("/etc/pnfsotd/cache2.json", "r") as f:
        content = f.read()
    if len(content) != 0:
        cache = json.loads(content)
        return cache
    else:
        return {}

def writeCache(cache):
    with open("/etc/pnfsotd/cache2.json", "w") as f:
        f.write(json.dumps(cache))
    
def getSongOfTheDay(utc_offset):
    
    userTime = datetime.now(timezone.utc) + timedelta(hours=utc_offset)
    evictionTime = datetime.now(timezone.utc) + timedelta(days=5)
    year = userTime.year
    month = userTime.month
    day = userTime.day
    hour = userTime.hour

    userDate = f"{year}-{month}-{day}"

    cache = loadCache()
    cache = cacheEvict(cache)
    if userDate in cache:
        return cache[userDate]
    else:
        # Get song or whatever here...
        songName=f"Song:{userDate}"
        songImage=f"Image:{userDate}"
        songAltText=f"AltText:{userDate}"
        songUrl=f"Url:{userDate}"
        songArtists=f"Artists:{userDate}"
        
        cache = cacheEvict(cache)

        cacheEntry = {
            "name":songName,
            "image":songImage,
            "altText":songAltText,
            "url":songUrl,
            "artists":songArtists,
            "evict":evictionTime.timestamp()
        }
        cache[userDate] = cacheEntry
        writeCache(cache)
        return cacheEntry
    
print(getSongOfTheDay(20))
    