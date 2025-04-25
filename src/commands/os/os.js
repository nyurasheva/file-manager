import os from 'os';
import { OPERATION_FAILED_MSG_RED } from '../../constants/messages.js';

// os --EOL
export function osEOL() {
  try {
    console.log(JSON.stringify(os.EOL));
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }
}

// os --cpus
export function osCPUs() {
  try {
    const cpus = os.cpus();
    console.log(`Total CPUs: ${cpus.length}`);
    cpus.forEach((cpu, idx) => {
      const speedGHz = (cpu.speed / 1000).toFixed(2);
      console.log(`CPU ${idx + 1}: ${cpu.model}, ${speedGHz} GHz`);
    });
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }
}

// os --homedir
export function osHomeDir() {
  try {
    console.log(os.homedir());
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }
}

// os --username
export function osUsername() {
  try {
    const userInfo = os.userInfo();
    console.log(userInfo.username);
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }
}

// os --architecture
export function osArch() {
  try {
    console.log(os.arch());
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }
}
