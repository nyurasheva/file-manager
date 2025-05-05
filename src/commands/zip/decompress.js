import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import {
  OPERATION_FAILED_MSG_RED,
  INVALID_CMD_MESSAGE_MAGENTA,
} from '../../constants/messages.js';
import { printCwd } from '../../utils/dirUtils.js';
import { FG_GREEN, FG_MAGENTA, RESET } from '../../constants/colors.js';

export async function decompress(src, dest) {
  if (!src || !dest) {
    console.log(
      `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} decompress command requires two parameters: "decompress path_to_file path_to_destination"${RESET}`
    );
    printCwd();
    return;
  }

  const srcPath = path.resolve(src);
  let destPath = path.resolve(dest);

  try {
    await fs.promises.access(srcPath, fs.constants.F_OK);
    const srcStat = await fs.promises.stat(srcPath);
    if (!srcStat.isFile()) {
      console.error(
        `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} Source must be a file.${RESET}`
      );
      printCwd();
      return;
    }

    const destDirPath = path.dirname(destPath);
    try {
      await fs.promises.access(destDirPath, fs.constants.F_OK);
    } catch {
      console.error(
        `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} Destination directory does not exist.${RESET}`
      );
      printCwd();
      return;
    }

    let isDestDirectory = false;
    try {
      const destStat = await fs.promises.stat(destPath);
      isDestDirectory = destStat.isDirectory();
    } catch {}

    if (isDestDirectory) {
      const filename = path.basename(srcPath, '.br');
      destPath = path.join(destPath, filename);
    }

    const fileExists = await fs.promises
      .access(destPath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      console.error(
        `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} Destination file already exists. Please choose another file name.${RESET}`
      );
      printCwd();
      return;
    }

    const readStream = fs.createReadStream(srcPath);
    const brotli = zlib.createBrotliDecompress();
    const writeStream = fs.createWriteStream(destPath);

    readStream
      .pipe(brotli)
      .pipe(writeStream)
      .on('error', () => {
        console.error(OPERATION_FAILED_MSG_RED);
        printCwd();
      });

    writeStream.on('finish', () => {
      console.log(`${FG_GREEN}File decompressed to ${destPath}${RESET}`);
      printCwd();
    });

    readStream.on('error', () => {
      console.error(OPERATION_FAILED_MSG_RED);
      printCwd();
    });
  } catch (err) {
    console.error(OPERATION_FAILED_MSG_RED);
    console.error(`${FG_MAGENTA}${err.message}${RESET}`);
    printCwd();
  }
}
