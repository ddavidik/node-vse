import fs from 'fs/promises';
import path from 'path';
import { COUNTER_FILE } from './main.js';
import { updateCounterByOne } from './updateCounterByOne.js';

export const resolveRequest = async (req) => {
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
