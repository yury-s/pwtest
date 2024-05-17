import * as http from 'http';
import mime from 'mime';
import * as fs from 'fs';
import * as path from 'path';

const server = http.createServer((req, res) => {
  console.log('url' , req.url);
  let filePath = process.cwd() + req.url;
  if (!fs.existsSync(filePath)) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }
  
  if (!fs.statSync(filePath).isFile()) {
    filePath = path.join(filePath, 'index.html')
    console.log('filePath', filePath);
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('404 Not a file');
      return;
    }
  }
  serveFile(res, filePath);
});
function serveFile(response, absoluteFilePath) {
  console.log('absoluteFilePath', absoluteFilePath);
  const content = fs.readFileSync(absoluteFilePath);
  response.statusCode = 200;
  const contentType = mime.getType(path.extname(absoluteFilePath)) || 'application/octet-stream';
  response.setHeader('Content-Type', contentType);
  response.setHeader('Content-Length', content.byteLength);
  response.end(content);
}

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
