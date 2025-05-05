import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import {
  OPERATION_FAILED_MSG_RED,
  INVALID_CMD_MESSAGE_MAGENTA,
} from '../../constants/messages.js';
import { printCwd } from '../../utils/dirUtils.js';
import { FG_GREEN, FG_MAGENTA, BRIGHT, RESET } from '../../constants/colors.js';

export async function compress(src, dest) {
  try {
    if (!src || !dest) {
      console.log(
        `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} compress command requires two parameters: "compress path_to_file path_to_destination"${RESET}`
      );
      return;
    }

    const srcPath = path.resolve(src);
    const destPath = path.resolve(dest);

    try {
      await fs.promises.access(srcPath, fs.constants.F_OK);
    } catch {
      console.error(
        `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} Source file does not exist.${RESET}`
      );
      return;
    }

    const srcStat = await fs.promises.stat(srcPath);
    if (!srcStat.isFile()) {
      console.error(
        `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} Source must be a file.${RESET}`
      );
      return;
    }

    const destDir = path.dirname(destPath);
    try {
      await fs.promises.access(destDir, fs.constants.F_OK);
    } catch {
      console.error(
        `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} Destination directory does not exist.${RESET}`
      );
      return;
    }

    if (!dest.endsWith('.br')) {
      console.log(
        `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} The destination file must have a .br extension (e.g. "file.br")${RESET}`
      );
      return;
    }

    const readStream = fs.createReadStream(srcPath);
    const brotli = zlib.createBrotliCompress();
    const fullDest = path.resolve(dest);

    const writeStream = fs.createWriteStream(fullDest);

    readStream
      .pipe(brotli)
      .pipe(writeStream)
      .on('error', () => console.error(OPERATION_FAILED_MSG_RED));

    writeStream.on('finish', () => {
      console.log(`${FG_GREEN}File compressed to ${dest}${RESET}`);
      printCwd();
    });

    readStream.on('error', () => console.error(OPERATION_FAILED_MSG_RED));
  } catch (err) {
    console.error(OPERATION_FAILED_MSG_RED);
    console.error(`${FG_MAGENTA}${err.message}${RESET}`);
    printCwd();
  }
}
