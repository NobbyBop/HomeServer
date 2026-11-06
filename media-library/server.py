# server.py

from http.server import *

class Server(BaseHTTPRequestHandler):
  
    # creating a function for Get Request
    def do_GET(self):
        if self.path == "/media-sorted.json":
            self.send_response(200)
            self.send_header('content-type', 'application/json')
            self.end_headers()
            with open("media-sorted.json", 'r') as jsonfile:
                self.wfile.write(jsonfile.read().encode())
        elif self.path == "/":
            self.send_response(200)
            self.send_header('content-type', 'text/html')
            self.end_headers()
            with open("index.html", 'r') as page:
                self.wfile.write(page.read().encode())

port = HTTPServer(('', 5555), Server)

port.serve_forever()