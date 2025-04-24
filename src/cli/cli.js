import readline from 'readline';
import { setState } from '../state.js';
import { handleCommand } from '../commands/handler.js';
import {
  GREETING_MSG,
  THANKS_MSG,
  EXIT_CMD
} from '../constants/messages.js';
import { printCwd } from '../utils/dirUtils.js';

export function startCLI({ username, home }) {
  setState('username', username);
  setState('cwd', home);

  console.log(`${GREETING_MSG} ${username}!`);
  printCwd();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const cmd = line.trim();
    if (cmd === EXIT_CMD) {
      rl.close();
    } else {
      await handleCommand(cmd);
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log(`${THANKS_MSG} ${username}, goodbye!`);
    process.exit(0);
  });
}
