import os
import base64
import requests
from dotenv import load_dotenv
import time
import threading 
import json
import random

access_token = ""
def getSpotifyToken():
    """
    Uses CLIENT_ID and CLIENT_SECRET from .env to get a new access token.
    First, checks if the current access token is still valid. If not, gets a new
    one and updates the REFRESH_TIMESTAMP and ACCESS_TOKEN in .env.
    """
    global access_token
    load_dotenv(override=True)

    client_id = os.environ.get("CLIENT_ID")
    client_secret = os.environ.get("CLIENT_SECRET")

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

    access_token = body["access_token"]

def spotifyGet(url, data={}):
    """
    Helper function for making 
    """
    global access_token
    i = 0
    while True:
        if i != 0:
            print(f"Rate-limited: sleeping for {i} seconds.")
            time.sleep(int(i))
        response = requests.get(url,
            headers={
                "Authorization":"Bearer " + access_token
            },
            data=data
        )
        if response.status_code != 200:
            if response.status_code == 429:
                if response.headers["Retry-After"]:
                    i = response.headers["Retry-After"]
                else:
                    i = max(1, i) * 2
                continue
            else:
                raise RuntimeError(f"Failed to get. Status code: {response.status_code}")
        
        return response.json()

trackInfo = []
trackInfoLock = threading.Lock()
def getTrackInfo(track_id):
    global trackInfo
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

    trackInfoLock.acquire()
    trackInfo.append({
        "name":body["name"],
        "image":imageUrl,
        "altText":altText,
        "artists": [artist["name"] for artist in body["artists"]],
        "url":f"https://open.spotify.com/track/{track_id}"
    })
    trackInfoLock.release()

def getAllTrackInfo():
    global tracklist
    threads = []
    for track_id in tracklist:
        t = threading.Thread(target=getTrackInfo, args=(track_id,))
        threads.append(t)
    for t in threads:
        t.start()
    for t in threads:
        t.join()


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
    print("Called populate tracklist.")
    
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
        time.sleep(1)
        t.start()
    for t in threads:
        t.join()

if __name__ == "__main__":
    getSpotifyToken()
    spotifyGet(f"https://api.spotify.com/v1/albums/2NlTgt3Btt2QZlolG41J1j/tracks")
    # populateTracklist()
    # getAllTrackInfo()
    # print(trackInfo)

