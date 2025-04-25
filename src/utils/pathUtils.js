import path from 'path';
import { getState, setState } from '../state.js';
import { INVALID_CMD_MESSAGE_MAGENTA } from '../constants/messages.js';

// Преобразовать target (abs или rel) в абсолютный путь
export function toAbsolutePath(target) {
  const { cwd } = getState();
  return path.isAbsolute(target) ? target : path.resolve(cwd, target);
}

// Проверка, что newCwd не выше корня
export function safeChangeDir(newCwd) {
  const root = path.parse(newCwd).root;
  if (newCwd.startsWith(root)) {
    setState('cwd', newCwd);
    return true;
  }
  return false;
}

// Проверка аргумента
export function requireArgs(args, count) {
  if (args.length < count || args.some(a => !a)) {
    console.log(INVALID_CMD_MESSAGE_MAGENTA);
    return false;
  }
  return true;
}
