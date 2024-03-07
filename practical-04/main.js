import http from 'http';
import path from 'path';
import fs from 'fs/promises';

const SERVER_PORT = 3000;
const COUNTER_FILE = path.join('public', 'counter.txt');

const initializeCounterFile = async () => {
  try {
    await fs.access(COUNTER_FILE);
  } catch {
    await fs.writeFile(COUNTER_FILE, '0');
  }
};

const updateCounterByOne = async (isIncrease) => {
  try {
    const value = await fs.readFile(COUNTER_FILE, 'utf8');
    const numberValue = Number(value);
    const newValue = isIncrease ? numberValue + 1 : numberValue - 1;

    await fs.writeFile(COUNTER_FILE, String(newValue));
  } catch (error) {
    throw new Error(
      `A problem occured while manipulating the counter file: ${error}`
    );
  }
};

const resolveRequest = async (req) => {
  const uri = req.url.slice(1) || 'index';
  try {
    switch (uri) {
      case 'increase':
      case 'decrease':
        const isIncrease = uri === 'increase';
        await updateCounterByOne(isIncrease, COUNTER_FILE);

        return `I have ${isIncrease ? 'increased' : 'decreased'} the value!`;
      case 'read':
        return await fs.readFile(COUNTER_FILE);
      case 'index':
        return await fs.readFile(path.join('public', 'index.html'));
      default:
        return new Promise((_, reject) => reject('not-found'));
    }
  } catch (error) {
    throw new Error(error);
  }
};

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
