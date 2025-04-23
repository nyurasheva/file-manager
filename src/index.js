import { homedir } from 'os';
import { startCLI } from './cli/cli.js';

const arg = process.argv.find(a => a.startsWith('--username='));
const username = arg ? arg.split('=')[1] : 'Anonymous';
const home = homedir();

startCLI({ username, home });
