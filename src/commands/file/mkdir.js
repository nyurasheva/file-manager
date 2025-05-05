import fs from 'fs';
import path from 'path';
import {
  OPERATION_FAILED_MSG_RED,
  INVALID_CMD_MESSAGE_MAGENTA,
} from '../../constants/messages.js';
import { getState } from '../../state.js';
import { printCwd } from '../../utils/dirUtils.js';
import { FG_GREEN, FG_MAGENTA, BRIGHT, RESET } from '../../constants/colors.js';

export async function mkdir(dirname) {
  if (!dirname) {
    console.error(
      `${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} (mkdir command should have a parameter, e.g. "mkdir new_directory_name")${RESET}`
    );
    printCwd();
    return;
  }

  try {
    const { cwd } = getState();
    const absolutePath = path.resolve(cwd, dirname);

    const dirExists = await fs.promises
      .access(absolutePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (dirExists) {
      console.log(
        `${FG_MAGENTA}Directory ${BRIGHT}"${dirname}" ${RESET}${FG_MAGENTA}already exists.${RESET}`
      );
      printCwd();
      return;
    }

    await fs.promises.mkdir(absolutePath);
    console.log(
      `${FG_GREEN}Directory ${BRIGHT}${dirname} ${RESET}${FG_GREEN}created in the current directory: ${cwd}${RESET}`
    );
    printCwd();
  } catch (err) {
    console.error(`${OPERATION_FAILED_MSG_RED} Failed to create directory.`);
    console.error(err);
    printCwd();
  }
}
