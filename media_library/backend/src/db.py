import pymongo
import os

# If running in Docker, it'll pass in the correct URL.
myclient = pymongo.MongoClient(os.environ.get("MONGO_CONNECT_URL", "mongodb://localhost:27017/"))
mydb = myclient["media-library"]

def getCollection():
    col = mydb["media"]
    return col