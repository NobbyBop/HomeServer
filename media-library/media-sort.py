#media-sort.py

import json
from functools import cmp_to_key
def compare(media_a, media_b):
    a = media_a["date"]
    b = media_b["date"]
    
    if a is None and b is not None:
        return -1
    if a is not None and b is None:
        return 1
    if a is None and b is None:
        return 0
        
    for attr in ["year", "month", "hour", "minute", "second"]:
        if a[attr] > b[attr]:
            return -1
        if a[attr] < b[attr]:
            return 1
    
    return 0

with open("media.json", 'r') as media_source:
    media_list = json.loads(media_source.read())
    sorted_media_list = sorted(media_list, key=cmp_to_key(compare))

with open("media-sorted.json", 'w') as media_output:
    media_output.write(json.dumps(sorted_media_list))