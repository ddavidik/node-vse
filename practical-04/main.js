import http from 'http';
import path from 'path';
import { initializeCounterFile } from './initializeCounterFile.js';
import { resolveRequest } from './resolveRequest.js';

const SERVER_PORT = 3000;
export const COUNTER_FILE = path.join('public', 'counter.txt');

const server = http.createServer(async (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    const response = await resolveRequest(req, COUNTER_FILE);
    res.write(`<h1>${response}</h1>`);
  } catch (error) {
    if (error === 'not-found') {
      res.statusCode = 404;
      return res.write('<h1>The page you are looking for does not exist.</h1>');
    }

    console.error(error);

    res.statusCode = 500;
    res.write('<h1>Something went wrong.</h1>');
  } finally {
    res.end();
  }
});

initializeCounterFile().then(() =>
  server.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}!`);
  })
);
