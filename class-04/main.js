import http from 'http';
import path from 'path';
import fs from 'fs/promises';

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = req.url.slice(1) || 'index.html';

    res.setHeader('Content-Type', 'text/html');
    const indexPath = path.join('public', urlPath);
    const indexFile = await fs.readFile(indexPath, 'utf8');

    res.write(indexFile);
  } catch {
    res.statusCode = 404;
    res.write('<h1>Damn dude this does not exist!</h1>');
  } finally {
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Hello, dudes!');
});
