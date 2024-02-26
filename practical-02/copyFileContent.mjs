import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const copyFileContent = async () => {
  const instructionPath = path.join(__dirname, 'instrukce.txt');

  fs.readFile(instructionPath, 'utf8', (err, instructions) => {
    if (err) throw Error(err);

    const [sourceFile, destinationFile] = instructions.split(', ');
    const sourceFilePath = path.join(__dirname, sourceFile);

    fs.access(sourceFilePath, (err) => {
      if (err) throw Error(`Source file "${sourceFile}" does not exist.`);
    });

    const destinationFilePath = path.join(__dirname, destinationFile);

    fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
      if (err) throw Error(err);

      console.log(
        `Content has been copied from ${sourceFile} to ${destinationFile}`
      );
    });
  });
};

copyFileContent();
