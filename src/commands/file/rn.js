import fs from 'fs';
import path from 'path';
import {
  OPERATION_FAILED_MSG_RED,
  INVALID_CMD_MESSAGE_MAGENTA,
} from '../../constants/messages.js';
import { getState } from '../../state.js';
import { printCwd } from '../../utils/dirUtils.js';
import { FG_GREEN, FG_MAGENTA, BRIGHT, RESET } from '../../constants/colors.js';

export async function rn(filepath, newName) {
  try {
    if (!filepath || !newName) {
      console.error(
        `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} (rn command should have two parameters, e.g. "rn path_to_file new_filename")${RESET}`
      );

      printCwd();
      return;
    }

    const { cwd } = getState();
    const absolutePath = path.resolve(cwd, filepath);
    const absoluteNewName = path.join(path.dirname(absolutePath), newName);

    await fs.promises.rename(absolutePath, absoluteNewName);
    console.log(
      `${FG_GREEN}${filepath} renamed to ${BRIGHT}${newName}${RESET}`
    );
    printCwd();
  } catch (err) {
    console.error(OPERATION_FAILED_MSG_RED);
    printCwd();
  }
}
