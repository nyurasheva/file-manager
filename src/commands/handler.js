import { up, cd, ls } from './navigation.js';
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
} from './os.js';
import { INVALID_CMD_MESSAGE } from '../constants/messages.js';

export async function handleCommand(input) {
  const [cmd, ...args] = input.split(' ');

  switch (cmd) {
    // Navigation
    case 'up':
      await up();
      break;
    case 'cd':
      await cd(args[0]);
      break;
    case 'ls':
      await ls();
      break;

    // File operations
    case 'cat':
      await cat(args[0]);
      break;
    case 'add':
      await add(args[0]);
      break;
    case 'rn':
      await rn(args[0], args[1]);
      break;
    case 'cp':
      await cp(args[0], args[1]);
      break;
    case 'mv':
      await mv(args[0], args[1]);
      break;
    case 'rm':
      await rm(args[0]);
      break;
    case 'mkdir':
      await mkdir(args[0]);
      break;

    // OS info
    case 'os':
      if (args[0] === '--EOL') {
        osEOL();
      } else if (args[0] === '--cpus') {
        osCPUs();
      } else if (args[0] === '--homedir') {
        osHomeDir();
      } else if (args[0] === '--username') {
        osUsername();
      } else if (args[0] === '--architecture') {
        osArch();
      } else {
        console.log(INVALID_CMD_MESSAGE);
      }
      break;

    default:
      console.log(INVALID_CMD_MESSAGE);
  }
}
