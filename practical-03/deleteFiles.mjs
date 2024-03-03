import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const deleteFilesWithNumber = async () => {
  try {
    const files = await fs.readdir(__dirname);
    const filesStartingWithNumber = files.filter((file) =>
      /\d/.test(file.charAt(0))
    );

    if (filesStartingWithNumber.length === 0)
      return void console.log('No files to delete');

    const fileDeletionPromises = filesStartingWithNumber.map((file) =>
      fs.unlink(path.join(__dirname, file))
    );

    await Promise.all(fileDeletionPromises);

    console.log('All files starting with numbers have been deleted.');
  } catch (err) {
    throw Error(err);
  }
};

deleteFilesWithNumber();
