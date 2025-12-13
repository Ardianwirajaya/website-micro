from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response = {
            "service": "Product Service",
            "status": "Active",
            "message": "Halo dari Python Microservice!"
        }
        self.wfile.write(json.dumps(response).encode())
        return