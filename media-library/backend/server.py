import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["media-library"]

photocol = mydb["photos"]
videocol = mydb["videos"]

# example = {
#     "path": "C:\\Users\\nicho\\Documents\\Development\\HomeServer\\media-library\\Media Dump 2\\iCloud Photos\\iCloud Photos\\1AD5BBCC-2E28-43BC-A90F-E2AF9CB5BB29.jpeg",
#     "filename": "1AD5BBCC-2E28-43BC-A90F-E2AF9CB5BB29.jpeg",
#     "date": {
#         "year": 2026,
#         "month": 1,
#         "day": 1,
#         "hour": 1,
#         "minute": 1,
#         "second": 1,
#     }
# }

# res = photocol.insert_one(example)

res = photocol.find_one()

print(res)
