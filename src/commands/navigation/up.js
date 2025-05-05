import path from 'path';
import { getState, setState } from '../../state.js';
import { printCwd } from '../../utils/dirUtils.js';
import { isRoot } from '../../utils/dirUtils.js';

export function up() {
  const { cwd } = getState();
  if (!isRoot(cwd)) {
    setState('cwd', path.dirname(cwd));
  }
  printCwd();
}
