from PIL import Image
from PIL.ExifTags import TAGS

jpeg = Image.open("C:\\Users\\nicho\\Desktop\\media\\00a50aee-f30d-4ffb-b71f-1299760f2f3e.JPEG")
png =  Image.open("C:\\Users\\nicho\\Desktop\\media\\fca1608d-8179-4854-9bbb-3630a56e8567.png")
# mp4 = Image.open("C:\\Users\\nicho\\Desktop\\media\\1518673c-dddc-4335-9d2b-710cb56eecc1.MP4")

exif_data = png.getexif()

# 0x0132 is the well-known tag for DateTime
if 0x0132 in exif_data.keys():
    print("Date Taken:", exif_data.get(0x0132, "N/A"))

