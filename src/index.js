import { homedir } from 'os';
import { startCLI } from './cli/cli.js';

console.clear();
process.chdir(homedir());

const arg = process.argv.find((a) => a.startsWith('--username='));
const username = arg ? arg.split('=')[1] : 'Anonymous';

startCLI({ username, home: homedir() });
