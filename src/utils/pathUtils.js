import path from 'path';
import { getState, setState } from '../state.js';
import { INVALID_CMD_MESSAGE_MAGENTA } from '../constants/messages.js';
import { printCwd } from '../utils/dirUtils.js';


export function toAbsolutePath(target) {
  const { cwd } = getState();
  return path.isAbsolute(target) ? target : path.resolve(cwd, target);
}

export function safeChangeDir(newCwd) {
  const root = path.parse(newCwd).root;
  if (newCwd.startsWith(root)) {
    setState('cwd', newCwd);
    return true;
  }
  return false;
}

export function requireArgs(args, count) {
  const { cwd } = getState();
  
  if (args.length < count || args.some(a => !a)) {
    console.log(INVALID_CMD_MESSAGE_MAGENTA);
    printCwd();
    return false;
  }
  return true;
}
