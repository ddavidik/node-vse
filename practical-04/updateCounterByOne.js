import fs from 'fs/promises';
import { COUNTER_FILE } from './main.js';

export const updateCounterByOne = async (isIncrease) => {
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
