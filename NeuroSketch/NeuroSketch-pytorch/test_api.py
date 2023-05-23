import requests
import base64
from PIL import Image

# Set the URL of the Flask server endpoint
url = 'http://127.0.0.1:5000/pic2html'

# Open the image file and encode it as a base64 string
with open('E:\\Projects\\Final project\\New folder\\Final-Year-Project\\NeuroSketch\\NeuroSketch-pytorch\\351.png', 'rb') as f:
    image_data = f.read()
image_str = base64.b64encode(image_data).decode("utf-8")

# Set the headers for the request
headers = {'Content-Type': 'multipart/form-data'}

# Set the data for the request
data = {'image': ('E:\\Projects\\Final project\\New folder\\Final-Year-Project\\NeuroSketch\\NeuroSketch-pytorch\\351.png', image_data)}

# Send the POST request to the Flask server endpoint
response = requests.post(url, headers=headers, files=data)

# Get the JSON response and extract the HTML code
json_data = response.json()
html_code = json_data['html_code']
print(response.text)