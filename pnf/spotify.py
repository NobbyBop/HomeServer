import os
import base64
import requests
from dotenv import load_dotenv
import time
import threading 
import json
import random

envLock = threading.Lock()
def updateDotEnv(accessToken, refreshTimestamp):
    envLock.acquire()
    newEnv = ""
    with open(".env", "r") as f:
        line = f.readline()
        while line.strip() != "":
            print(line)
            if "CLIENT" in line:
                newEnv += line + "\n"
            line = f.readline()
    newEnv += f"ACCESS_TOKEN={accessToken}\nREFRESH_TIMESTAMP={refreshTimestamp}"
    with open(".env", "w") as f:
        f.write(newEnv)
    envLock.release()
    
def checkAndGetSpotifyToken():
    """
    Uses CLIENT_ID and CLIENT_SECRET from .env to get a new access token.
    First, checks if the current access token is still valid. If not, gets a new
    one and updates the REFRESH_TIMESTAMP and ACCESS_TOKEN in .env.
    """
    load_dotenv(override=True)
    client_id = os.environ.get("CLIENT_ID")
    client_secret = os.environ.get("CLIENT_SECRET")

    # If the refresh timestamp is later than now, we don't need to do anything.
    # Unless, for some reason, there is no access token.
    refresh_timestamp = os.environ.get("REFRESH_TIMESTAMP")
    if refresh_timestamp is not None:
        if float(str(refresh_timestamp)) > time.time():
            if os.environ.get("ACCESS_TOKEN") != "":
                print("Access token is valid!")
                return

    base64_bytes = base64.b64encode(f"{client_id}:{client_secret}".encode())
    base64_string = base64_bytes.decode("ascii")

    response = requests.post(
        "https://accounts.spotify.com/api/token",
        headers={
            "Authorization": "Basic " + base64_string,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data={
            "grant_type":"client_credentials"
        }
    )

    if response.status_code != 200:
        print("Failed to get access token from Spotify.")
        print(f"Response: {response.text}")
        raise RuntimeError("Failed to get access token from Spotify.")
    
    body = response.json()

    updateDotEnv(body["access_token"], str(time.time()+body["expires_in"]))

def spotifyGet(url, data={}):
    """
    Helper function for making 
    """
    try:
        checkAndGetSpotifyToken()
    except RuntimeError as e:
        raise RuntimeError(e)
    
    response = requests.get(url,
        headers={
            "Authorization":"Bearer " + str(os.environ.get("ACCESS_TOKEN"))
        },
        data=data
    )
    if response.status_code != 200:
        raise RuntimeError(f"Failed to post. Status code: {response.status_code}")
    
    return response.json()

def getSongOfTheDay():
    """
    Checks the cache to see if the song of the day is already there, or if it is
    expired. If it is, it pops the next track off the tracklist and fetches its
    data.
    If the tracklist is empty, it repopulates it.
    Also, creates those two files if they don't exist yet.
    """

    print("Entering song of the day.")

    date = time.gmtime()
    checkYear = date.tm_year
    checkMonth = date.tm_mon
    checkDay = date.tm_mday

    # Check cache first
    with open("cache.json", "a"):
        pass
    with open("cache.json", "r") as f:
        content = f.read().strip()
    if len(content) > 0:
        cache = json.loads(content)
        if cache["year"] == checkYear and cache["month"] == checkMonth and cache["day"] == checkDay:
            print("Retrieved song from cache!")
            return cache
    
    print("Cache not valid.")
    
    # Cache not valid, get next track from tracklist.
    try:
        with open("tracklist.json", "r") as f:
            content = f.read().strip()
    except:
        populateTracklist()
        with open("tracklist.json", "r") as f:
            content = f.read().strip()
        
    tracks = json.loads(content)
    if len(tracks) == 0:
        populateTracklist()

    track_id = tracks.pop()
    track = getTrackInfo(track_id)
    with open("cache.json", "w") as f:
        f.write(json.dumps(
            {
            "name": track["name"],
            "image": track["image"],
            "altText": track["altText"],
            "artists": track["artists"],
            "url":track["url"],
            "day": checkDay,
            "month": checkMonth,
            "year": checkYear,
            }
        ))
    
    # We have the track of the day now. If that was the last track, refresh it.
    if len(tracklist) > 0:
        with open("tracklist.json", "w") as f:
            f.write(json.dumps(tracks))
    else:
        populateTracklist()
    return track

def getTrackInfo(track_id):
    """
    Gets title, image, link to track based on Spotify ID.
    """
    try:
        body = spotifyGet(f"https://api.spotify.com/v1/tracks/{track_id}")
    except RuntimeError as e:
        raise RuntimeError(f"Failed to get info for track id {track_id}\n{e}")
    if "images" not in body["album"] or len(body["album"]["images"]) == 0 or "url" not in body["album"]["images"][0]:
        imageUrl = "https://picsum.photos/640"
        altText = "Placeholder image, track image not found."
    else:
        imageUrl = body["album"]["images"][0]["url"]
        altText = f"Track image for {body["name"]}."

    return {
        "name":body["name"],
        "image":imageUrl,
        "altText":altText,
        "artists": [artist["name"] for artist in body["artists"]],
        "url":f"https://open.spotify.com/track/{track_id}"
    }
    
trackLock = threading.Lock()
tracklist = []
def addAlbumTracks(album_id):
    """
    Adds the tracks from album with track_id to the global variable tracklist.
    This is written concurrently so I can fetch all albums' tracks at once.
    """
    global tracklist
    try:
        body = spotifyGet(f"https://api.spotify.com/v1/albums/{album_id}/tracks")
    except RuntimeError as e:
        raise RuntimeError(f"Failed to get album tracks for album id {album_id}\n{e}")
    albumTracks = [item["id"] for item in body["items"]]
    trackLock.acquire()
    tracklist += albumTracks
    trackLock.release()

def populateTracklist():
    """
    Using a set of predetermined Phineas and Ferb albums, fetches all songs
    and populates tracklist.json with their IDs as a list.
    """
    
    ALBUM_IDS =[
        "2NlTgt3Btt2QZlolG41J1j",
        "1mwUxOieg2GvQn4wm5bJR1",
        "77jAlhvBI46I7MiMmfsEbF",
        "21gb7dqhwHqphZjxMzkcop",
        "17UaoAh0UsPryIa6Em6zRL",
        "7jiDj8Jdry8EtfY4VTqLb7",
        "6jL556jKpcmy29zOrFELKj",
        "4LyKQilbZTx4SL1gXG3u8x",
        "0ilQNbh2SZzRzVTwz85gM4"
    ]

    global tracklist
    tracklist = []

    threads = []
    for id in ALBUM_IDS:
        t = threading.Thread(target=addAlbumTracks, args=(id,))
        threads.append(t)
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    random.shuffle(tracklist)

    if len(tracklist) < 0:
        raise RuntimeError("Couldn't get tracks, not updating tracklist file.")
    with open("tracklist.json", "w") as f:
        f.write(json.dumps(tracklist))