import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const copyFileContent = async () => {
  try {
    const instructionPath = path.join(__dirname, 'instrukce.txt');
    const instructions = await fs.readFile(instructionPath, 'utf8');
    const [sourceFile, destinationFile] = instructions.split(', ');

    const sourceFilePath = path.join(__dirname, sourceFile);

    try {
      await fs.access(sourceFilePath);
    } catch (error) {
      throw Error(`Source file "${sourceFile}" does not exist.`);
    }

    const destinationFilePath = path.join(__dirname, destinationFile);

    try {
      await fs.copyFile(sourceFilePath, destinationFilePath);
    } catch (err) {
      throw Error(err);
    }

    console.log(
      `Content has been copied from ${sourceFile} to ${destinationFile}`
    );
  } catch (err) {
    throw Error(err);
  }
};

copyFileContent();
