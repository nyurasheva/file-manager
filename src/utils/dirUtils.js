import path from 'path';
import { getState, setState } from '../state.js';
import { CURRENT_DIR_MSG, OPERATION_FAILED_MSG_RED } from '../constants/messages.js';
import { FG_CYAN, RESET } from '../constants/colors.js';

// Проверка, что директория — корневая
export function isRoot(dir) {
  const parent = path.dirname(dir);
  return parent === dir;
}

// Печать текущей директории
export function printCwd() {
  const { cwd } = getState();
  console.log(`${FG_CYAN}${CURRENT_DIR_MSG} ${cwd}${RESET}`);
}

// Безопасно сменить директорию, не выше корня
export function safeSetCwd(newDir) {
  if (!isRoot(getState().cwd) || newDir !== getState().cwd) {
    setState('cwd', newDir);
    printCwd();
  } else {
    console.log(OPERATION_FAILED_MSG_RED);
  }
}