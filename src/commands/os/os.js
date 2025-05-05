import os from 'os';
import { OPERATION_FAILED_MSG_RED } from '../../constants/messages.js';
import { printCwd } from '../../utils/dirUtils.js';
import { FG_GREEN, BRIGHT, RESET } from '../../constants/colors.js';

// os --EOL
export function osEOL() {
  try {
    console.log(`${FG_GREEN}${BRIGHT}${JSON.stringify(os.EOL)}${RESET}`);
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }
  printCwd();
}

// os --cpus
export function osCPUs() {
  try {
    const cpus = os.cpus();
    console.log(`${FG_GREEN}${BRIGHT}Total CPUs: ${cpus.length}${RESET}`);
    cpus.forEach((cpu, idx) => {
      const speedGHz = (cpu.speed / 1000).toFixed(2);
      console.log(
        `${FG_GREEN}${BRIGHT}CPU ${idx + 1}: ${cpu.model}, ${speedGHz} GHz${RESET}`
      );
    });
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }
  printCwd();
}

// os --homedir
export function osHomeDir() {
  try {
    console.log(`${FG_GREEN}${BRIGHT}${os.homedir()}${RESET}`);
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }
  printCwd();
}

// os --username
export function osUsername() {
  try {
    const userInfo = os.userInfo();
    console.log(`${FG_GREEN}${BRIGHT}${userInfo.username}${RESET}`);
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }
  printCwd();
}

// os --architecture
export function osArch() {
  try {
    console.log(`${FG_GREEN}${BRIGHT}${os.arch()}${RESET}`);
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }
  printCwd();
}
