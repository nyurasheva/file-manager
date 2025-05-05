import fs from 'fs';
import path from 'path';
import {
  OPERATION_FAILED_MSG_RED,
  INVALID_CMD_MESSAGE_MAGENTA
} from '../../constants/messages.js';
import { getState } from '../../state.js';
import { printCwd } from '../../utils/dirUtils.js';
import { FG_GREEN, FG_MAGENTA, BRIGHT, RESET } from '../../constants/colors.js';

export async function mv(src, dest) {
  try {
    if (!src || !dest) {
      console.error(`${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} (mv command should have two parameters, e.g. "mv path_to_file path_to_new_directory")${RESET}`);
      return;
    }

    const { cwd } = getState();
    const srcPath = path.resolve(cwd, src);
    let destPath = path.resolve(cwd, dest);

    await fs.promises.access(srcPath, fs.constants.F_OK);

    const srcStat = await fs.promises.stat(srcPath);
    if (!srcStat.isFile()) {
      console.error(`${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA}. Source must be a file.${RESET}`);
      return;
    }

    const destStat = await fs.promises.stat(destPath).catch(() => null);

    if (!destStat?.isDirectory()) {
      console.error(`${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA}. Destination directory does not exist or is not a directory.${RESET}`);
      return;
    }

    if (destStat?.isDirectory()) {
      const filename = path.basename(srcPath);
      destPath = path.join(destPath, filename);
    }

    try {
      await fs.promises.access(destPath, fs.constants.F_OK);
      await fs.promises.unlink(destPath);
      console.log(`${FG_MAGENTA}${BRIGHT}File already exists, it has been overwritten.${RESET}`);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(srcPath);
      const writeStream = fs.createWriteStream(destPath);

      readStream.on('error', reject);
      writeStream.on('error', reject);
      writeStream.on('finish', resolve);

      readStream.pipe(writeStream);
    });

    await fs.promises.unlink(srcPath);

    console.log(`${FG_GREEN}${BRIGHT}${src}${RESET}${FG_GREEN} has been moved to ${BRIGHT}${destPath}${RESET}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA}. File or directory not found.${RESET}`);
    } else {
      console.error(OPERATION_FAILED_MSG_RED);
      console.error(`${FG_MAGENTA}${err.message}${RESET}`);
    }
  } finally {
    printCwd();
  }
}
