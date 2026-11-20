import pymongo
import os

# If running in Docker, it'll pass in the correct URL.
myclient = pymongo.MongoClient(os.environ["MONGO_CONNECT_URL"])
mydb = myclient["media-library"]

def getCollection():
    col = mydb["media"]
    return col