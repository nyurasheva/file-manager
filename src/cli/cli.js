import readline from 'readline';
import { getState, setState } from '../state.js';
import { GREETING_MSG, CURRENT_DIR_MSG, THANKS_MSG } from '../constants/messages.js';

export function startCLI({ username, home }) {
  setState('username', username);
  setState('cwd', home);

  console.log(`${GREETING_MSG} ${username}!`);
  printCwd();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', line => {
    const cmd = line.trim();
    if (cmd === '.exit') {
      rl.close();
    } else {
      // Пока просто игнорируем все команды
      printCwd();
    }
  });

  rl.on('close', () => {
    console.log(`${THANKS_MSG} ${username}, goodbye!`);
    process.exit(0);
  });
}

function printCwd() {
  const { cwd } = getState();
  console.log(`${CURRENT_DIR_MSG} ${cwd}`);
}
