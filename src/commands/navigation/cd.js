import fs from 'fs';
import { setState } from '../../state.js';
import { printCwd } from '../../utils/dirUtils.js';
import { toAbsolutePath } from '../../utils/pathUtils.js';
import { INVALID_CMD_MESSAGE_MAGENTA, OPERATION_FAILED_MSG_RED } from '../../constants/messages.js';

export async function cd(target) {
  if (!target) {
    console.log(INVALID_CMD_MESSAGE_MAGENTA);
    return;
  }

  const newPath = toAbsolutePath(target);

  try {
    const stat = await fs.promises.stat(newPath);
    if (stat.isDirectory()) {
      setState('cwd', newPath);
    } else {
      console.log(INVALID_CMD_MESSAGE_MAGENTA);
    }
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }
  printCwd();
}
