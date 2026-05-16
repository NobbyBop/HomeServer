import http.server as s
from jinja2 import Environment, FileSystemLoader
from spotify import getSongOfTheDay  

class PNF(s.BaseHTTPRequestHandler):
  
    def do_GET(self):
        
        if self.path.startswith("/fonts"):
            print(self.path)
            with open(self.path[1:], 'rb') as f:
                self.send_response(200)
                self.send_header('content-type', 'font/ttf')
                self.end_headers()
                self.wfile.write(f.read())
            return
        elif self.path != "/":
            self.send_response(404)
            self.send_header('content-type', 'text/html')
            self.end_headers()
            env = Environment(loader = FileSystemLoader("."))
            template = env.get_template("notfound.jinja")
            html = template.render()
            self.wfile.write(html.encode())
            return
        
        try:
            track = getSongOfTheDay()
        except RuntimeError as e:
            self.send_response(500)
            track = {
                "name":f"INTERNAL SERVER ERROR : {e}",
                "image": "https://picsum.photos/640",
                "altText": "Placeholder image, track image not found."
            }
        self.send_response(200)

        self.send_header('content-type', 'text/html')
        self.end_headers()

        env = Environment(loader = FileSystemLoader("."))
        template = env.get_template("index.jinja")
        html = template.render(name=track["name"],
                               url=track["url"],
                               image=track["image"],
                               altText=track["altText"],
                               artists=track["artists"])

        self.wfile.write(html.encode())
        
port = s.ThreadingHTTPServer(('', 5555), PNF)
print("Server at http://localhost:5555")
port.serve_forever()