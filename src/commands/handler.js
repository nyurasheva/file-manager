import { up } from './navigation/up.js';
import { cd } from './navigation/cd.js';
import { ls } from './navigation/ls.js';
import { cat } from './file/cat.js';
import { add } from './file/add.js';
import { rn } from './file/rn.js';
import { cp } from './file/cp.js';
import { mv } from './file/mv.js';
import { rm } from './file/rm.js';
import { mkdir } from './file/mkdir.js';
import {
  osEOL,
  osCPUs,
  osHomeDir,
  osUsername,
  osArch
} from './os/os.js';
import { hash } from './hash/hash.js';
import { compress } from './zip/compress.js';
import { decompress } from './zip/decompress.js';
import { INVALID_CMD_MESSAGE_MAGENTA, CURRENT_DIR_MSG } from '../constants/messages.js';
import { FG_CYAN, RESET } from '../constants/colors.js';
import { getState } from '../state.js';
import { printCwd } from '../utils/dirUtils.js';

const COMMANDS = {
  // Navigation
  up: () => up(),
  cd: args => cd(args[0]),
  ls: () => ls(),

  // File operations
  cat: args => cat(args[0]),
  add: args => add(args[0]),
  rn: args => rn(args[0], args[1]),
  cp: args => cp(args[0], args[1]),
  mv: args => mv(args[0], args[1]),
  rm: args => rm(args[0]),
  mkdir: args => mkdir(args[0]),

  // OS info
  '--EOL': () => osEOL(),
  '--cpus': () => osCPUs(),
  '--homedir': () => osHomeDir(),
  '--username': () => osUsername(),
  '--architecture': () => osArch(),

  // Hash
  hash: args => hash(args[0]),

  // Zip
  compress: args => compress(args[0], args[1]),
  decompress: args => decompress(args[0], args[1]),
};

export async function handleCommand(input) {
  const [cmd, ...args] = input.split(' ');
  const { cwd } = getState();

  if (cmd === 'os') {
    const sub = args[0];
    const fn = COMMANDS[sub];
    if (fn) {
      await fn(args.slice(1));
      return;
    }
  } else {
    const fn = COMMANDS[cmd];
    if (fn) {
      await fn(args);
      return;
    }
  }

  console.log(INVALID_CMD_MESSAGE_MAGENTA);
  printCwd();
}
