import fs from 'fs/promises';
import path from 'path';
import {
  OPERATION_FAILED_MSG_RED,
  INVALID_CMD_MESSAGE_MAGENTA,
} from '../../constants/messages.js';
import { getState } from '../../state.js';
import { FG_MAGENTA, RESET } from '../../constants/colors.js';
import { printCwd } from '../../utils/dirUtils.js';

export async function cat(filepath) {
  if (!filepath) {
    console.error(
      `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} (cat command should have a parameter, e.g. "cat path_to_file")${RESET}`
    );
    printCwd();
    return;
  }

  try {
    const { cwd } = getState();
    const absolutePath = path.resolve(cwd, filepath);

    const content = await fs.readFile(absolutePath, 'utf-8');
    console.log(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(
        `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA}. File not found.${RESET}`
      );
    } else {
      console.error(OPERATION_FAILED_MSG_RED);
      console.error(`${FG_MAGENTA}${err.message}${RESET}`);
    }
  } finally {
    printCwd();
  }
}
