import os
import base64
import requests
from dotenv import load_dotenv
import time
import threading 
import json
import random

def getSongOfTheDay(timezone):
    date = time.