import readline from 'readline';
import { setState } from '../state.js';
import { handleCommand } from '../commands/handler.js';
import {
  GREETING_MSG,
  THANKS_MSG,
  EXIT_CMD
} from '../constants/messages.js';
import { printCwd } from '../utils/dirUtils.js';
import {
  FG_CYAN,
  FG_YELLOW,
  BRIGHT,
  RESET
} from '../constants/colors.js';

export function startCLI({ username, home }) {
  setState('username', username);
  setState('cwd', home);

  console.log(`${FG_YELLOW}${BRIGHT}${GREETING_MSG} ${username}!${RESET}`);
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
    console.log(`${FG_YELLOW}${BRIGHT}${THANKS_MSG} ${username}, goodbye!${RESET}`);
    process.exit(0);
  });
}
