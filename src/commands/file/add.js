import fs from 'fs/promises';
import path from 'path';
import { OPERATION_FAILED_MSG_RED, INVALID_CMD_MESSAGE_MAGENTA } from '../../constants/messages.js';
import { getState } from '../../state.js';
import { FG_GREEN, FG_MAGENTA, BRIGHT, DIM, RESET } from '../../constants/colors.js';
import { printCwd } from '../../utils/dirUtils.js';

export async function add(filename) {
  const { cwd } = getState();

  if (!filename) {
    console.error(`${INVALID_CMD_MESSAGE_MAGENTA}${FG_MAGENTA} (add command should have a parameter, e.g. "add new_file_name")${RESET}`);
    printCwd();
    return;
  }

  try {
    const absolutePath = path.resolve(cwd, filename);

    try {
      await fs.access(absolutePath);
      console.log(`${FG_MAGENTA}File already exists: ${filename}${RESET}`);
      return;
    } catch (err) {

    }

    await fs.writeFile(absolutePath, '', { flag: 'wx' });
    console.log(
      `${FG_GREEN}${BRIGHT}${filename}${RESET}${FG_GREEN}${DIM} has been created in the current directory: ${cwd}${RESET}`
    );
  } catch (err) {
    console.error(OPERATION_FAILED_MSG_RED);
  } finally {
    printCwd();
  }
}
