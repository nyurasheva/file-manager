import { promises as fs } from 'fs';
import path from 'path';
import { getState } from '../../state.js';
import { printCwd } from '../../utils/dirUtils.js';
import { toAbsolutePath } from '../../utils/pathUtils.js';
import { OPERATION_FAILED_MSG_RED } from '../../constants/messages.js';

export async function ls() {
  const { cwd } = getState();
  try {
    const dir = toAbsolutePath(cwd);
    const entries = await fs.readdir(dir, { withFileTypes: true });

    // Формируем список и сортируем
    const dirs = entries.filter(e => e.isDirectory()).map(e => ({ name: e.name, type: 'dir' }));
    const files = entries.filter(e => e.isFile()).map(e => ({ name: e.name, type: 'file' }));
    const list = [...dirs, ...files].sort((a, b) => a.name.localeCompare(b.name));

    // Вычисляем ширины колонок
    const idxWidth = Math.max(String(list.length).length, '(index)'.length);
    const nameWidth = Math.max(...list.map(i => i.name.length), 'Name'.length);
    const typeWidth = Math.max(...list.map(i => i.type.length), 'Type'.length);

    const sep = '+' +
      '-'.repeat(idxWidth + 2) + '+' +
      '-'.repeat(nameWidth + 2) + '+' +
      '-'.repeat(typeWidth + 2) + '+';

    console.log(sep);
    console.log(
      `| ${( '(index)' ).padEnd(idxWidth)} | ${'Name'.padEnd(nameWidth)} | ${'Type'.padEnd(typeWidth)} |`
    );
    console.log(sep);

    list.forEach((item, i) => {
      console.log(
        `| ${String(i + 1).padEnd(idxWidth)} | ${item.name.padEnd(nameWidth)} | ${item.type.padEnd(typeWidth)} |`
      );
    });
    console.log(sep);
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }
  printCwd();
}