import fs from 'fs/promises';
import { COUNTER_FILE } from './main.js';

export const initializeCounterFile = async () => {
  try {
    await fs.access(COUNTER_FILE);
  } catch {
    await fs.writeFile(COUNTER_FILE, '0');
  }
};
