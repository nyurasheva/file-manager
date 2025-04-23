import fs from 'fs';
import { OPERATION_FAILED_MSG } from '../../constants/messages.js';

export async function cat(filepath) {
  try {
    const data = await fs.promises.readFile(filepath, 'utf8');
    console.log(data);
  } catch (err) {
    console.error(OPERATION_FAILED_MSG);
  }
}
