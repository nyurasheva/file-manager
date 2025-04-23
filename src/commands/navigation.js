import { promises as fs } from 'fs';
import path from 'path';
import { getState, setState } from '../state.js';
import {
  CURRENT_DIR_MSG,
  OPERATION_FAILED_MSG,
} from '../constants/messages.js';

function isRoot(dir) {
  const parent = path.dirname(dir);
  return parent === dir;
}

function printCwd() {
  const { cwd } = getState();
  console.log(`${CURRENT_DIR_MSG} ${cwd}`);
}

export async function up() {
  const { cwd } = getState();
  if (!isRoot(cwd)) {
    setState('cwd', path.dirname(cwd));
  }
  printCwd();
}

export async function cd(target) {
  if (!target) {
    console.log('Invalid input');
    return;
  }
  const { cwd } = getState();
  const newPath = path.isAbsolute(target) ? target : path.resolve(cwd, target);
  try {
    const stat = await fs.stat(newPath);
    if (stat.isDirectory()) {
      setState('cwd', newPath);
    } else {
      console.log('Invalid input');
    }
  } catch {
    console.log(OPERATION_FAILED_MSG);
  }
  printCwd();
}

export async function ls() {
  const { cwd } = getState();
  try {
    const entries = await fs.readdir(cwd, { withFileTypes: true });
    const dirs = entries.filter(e => e.isDirectory()).map(e => ({ name: e.name, type: 'dir' }));
    const files = entries.filter(e => e.isFile()).map(e => ({ name: e.name, type: 'file' }));
    const list = [...dirs, ...files].sort((a, b) => a.name.localeCompare(b.name));

    // Вычисляем ширины
    const idxWidth = Math.max(String(list.length).length, '(index)'.length);
    const nameWidth = Math.max(...list.map(i => i.name.length), 'Name'.length);
    const typeWidth = Math.max(...list.map(i => i.type.length), 'Type'.length);

    const sep = '+' +
      '-'.repeat(idxWidth + 2) + '+' +
      '-'.repeat(nameWidth + 2) + '+' +
      '-'.repeat(typeWidth + 2) + '+';

    // Шапка
    console.log(sep);
    console.log(
      `| ${( '(index)' ).padEnd(idxWidth)} | ${'Name'.padEnd(nameWidth)} | ${'Type'.padEnd(typeWidth)} |`
    );
    console.log(sep);

    // Тело
    list.forEach((item, i) => {
      console.log(
        `| ${String(i + 1).padEnd(idxWidth)} | ${item.name.padEnd(nameWidth)} | ${item.type.padEnd(typeWidth)} |`
      );
    });
    console.log(sep);
  } catch {
    console.log(OPERATION_FAILED_MSG);
  }
  printCwd();
}
