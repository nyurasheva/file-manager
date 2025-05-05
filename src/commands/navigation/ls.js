import { promises as fs } from 'fs';
import { getState } from '../../state.js';
import { printCwd } from '../../utils/dirUtils.js';
import { toAbsolutePath } from '../../utils/pathUtils.js';
import {
  OPERATION_FAILED_MSG_RED,
  EMPTY_MSG_GREEN,
} from '../../constants/messages.js';

export async function ls() {
  const { cwd } = getState();
  try {
    const dir = toAbsolutePath(cwd);
    const entries = await fs.readdir(dir, { withFileTypes: true });

    const dirs = entries
      .filter((e) => e.isDirectory())
      .map((e) => ({ Name: e.name, Type: 'dir' }))
      .sort((a, b) => a.Name.localeCompare(b.Name));

    const files = entries
      .filter((e) => e.isFile())
      .map((e) => ({ Name: e.name, Type: 'file' }))
      .sort((a, b) => a.Name.localeCompare(b.Name));

    const list = [...dirs, ...files];

    if (list.length === 0) {
      console.log(EMPTY_MSG_GREEN);
    } else {
      console.table(list);
    }
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }

  printCwd();
}
