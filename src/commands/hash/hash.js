import fs from 'fs';
import crypto from 'crypto';
import {
  OPERATION_FAILED_MSG_RED,
  INVALID_CMD_MESSAGE_MAGENTA,
} from '../../constants/messages.js';
import { printCwd } from '../../utils/dirUtils.js';
import { FG_MAGENTA, FG_GREEN, RESET } from '../../constants/colors.js';

export async function hash(filepath) {
  if (!filepath) {
    console.error(
      `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} (hash command should have a filepath argument, e.g. "hash path_to_file")${RESET}`
    );
    printCwd();
    return;
  }

  try {
    await fs.promises.access(filepath, fs.constants.F_OK);

    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filepath);

    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => {
      const digest = hash.digest('hex');
      console.log(`${FG_GREEN}${digest}${RESET}`);
      printCwd();
    });
    stream.on('error', () => {
      console.log(OPERATION_FAILED_MSG_RED);
      printCwd();
    });
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(
        `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA}. File not found.${RESET}`
      );
    } else {
      console.log(OPERATION_FAILED_MSG_RED);
    }
    printCwd();
  }
}
