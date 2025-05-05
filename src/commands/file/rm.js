import fs from 'fs';
import path from 'path';
import {
  OPERATION_FAILED_MSG_RED,
  INVALID_CMD_MESSAGE_MAGENTA
} from '../../constants/messages.js';
import { getState } from '../../state.js';
import { printCwd } from '../../utils/dirUtils.js';
import { FG_GREEN, FG_MAGENTA, BRIGHT, RESET } from '../../constants/colors.js';

export async function rm(filepath) {
  try {
    if (!filepath) {
      console.error(`${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} (rm command should have a parameter, e.g. "rm path_to_file")${RESET}`);
      printCwd();
      return;
    }

    const { cwd } = getState();
    const absolutePath = path.resolve(cwd, filepath);

    const stats = await fs.promises.stat(absolutePath);
    if (stats.isDirectory()) {
      console.error(`${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA}. Cannot delete directory using rm.${RESET}`);
      printCwd();
      return;
    }

    await fs.promises.unlink(absolutePath);
    console.log(`${FG_GREEN}${BRIGHT}${filepath}${RESET}${FG_GREEN} has been deleted.${RESET}`);
    printCwd();
  } catch (err) {
    
    if (err.code === 'ENOENT') {
      console.error(`${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA}. File not found.${RESET}`);
    } else {
      console.error(OPERATION_FAILED_MSG_RED);
      console.error(`${FG_MAGENTA}${err.message}${RESET}`);
    }

    printCwd();
  }
}
