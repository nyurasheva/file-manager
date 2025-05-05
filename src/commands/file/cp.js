import fs from 'fs';
import path from 'path';
import {
  OPERATION_FAILED_MSG_RED,
  INVALID_CMD_MESSAGE_MAGENTA,
} from '../../constants/messages.js';
import { FG_MAGENTA, FG_GREEN, BRIGHT, RESET } from '../../constants/colors.js';
import { getState } from '../../state.js';
import { printCwd } from '../../utils/dirUtils.js';

export async function cp(filepath, newDir) {
  try {
    if (!filepath || !newDir) {
      console.error(`${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} (cp command should have two parameters, e.g. "cp path_to_file path_to_new_directory")${RESET}`);
      return;
    }

    const { cwd } = getState();
    const absolutePath = path.resolve(cwd, filepath);
    let newDirPath = path.resolve(cwd, newDir);

    await fs.promises.access(absolutePath, fs.constants.F_OK);

    const srcStat = await fs.promises.stat(absolutePath);
    if (!srcStat.isFile()) {
      console.error(`${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA}. Source must be a file.${RESET}`);
      return;
    }

    const destStat = await fs.promises.stat(newDirPath).catch(() => null);

    if (!destStat?.isDirectory()) {
      console.error(`${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA}. Destination directory not found.${RESET}`);
      return;
    }

    const fileName = path.basename(filepath);
    const newFilePath = path.join(newDirPath, fileName);

    try {
      await fs.promises.access(newFilePath, fs.constants.F_OK);
      await fs.promises.unlink(newFilePath);
      console.log(`${FG_MAGENTA}${BRIGHT}File already exists, it has been overwritten.${RESET}`);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(absolutePath);
      const writeStream = fs.createWriteStream(newFilePath);  

      readStream.on('error', reject);
      writeStream.on('error', reject);
      writeStream.on('finish', resolve);

      readStream.pipe(writeStream);
    });

    console.log(`${FG_GREEN}${BRIGHT}${fileName}${RESET}${FG_GREEN} has been copied to ${newDirPath}${RESET}`);
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
