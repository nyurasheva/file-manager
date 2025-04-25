import fs from 'fs';
import { OPERATION_FAILED_MSG_RED } from '../../constants/messages.js';

export async function add(filename) {
  try {
    await fs.promises.writeFile(filename, '');
    console.log(`${filename} has been created.`);
  } catch (err) {
    console.error(OPERATION_FAILED_MSG_RED);
  }
}