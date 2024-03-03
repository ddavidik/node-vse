import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const makeFiles = async () => {
  try {
    const instructionPath = path.join(__dirname, 'instrukce.txt');
    const instructions = await fs.readFile(instructionPath, 'utf8');
    const numberOfFiles = Number(instructions.trim());

    if (isNaN(numberOfFiles))
      throw Error(
        `Instructions are not in the correct format! Expected number, got ${instructions.trim()}`
      );
    if (numberOfFiles < 1)
      throw Error('Number of files must be greater than zero!');

    const fileCreationPromises = Array.from(
      { length: numberOfFiles },
      (_, index) => {
        const fileName = `${index}.txt`;
        const filePath = path.join(__dirname, fileName);

        return fs.writeFile(filePath, `Soubor ${index}`);
      }
    );

    await Promise.all(fileCreationPromises);

    console.log(`${numberOfFiles} files have been created successfully.`);
  } catch (err) {
    throw Error(err);
  }
};

makeFiles();
