import fs from 'fs';
import { OPERATION_FAILED_MSG_RED } from '../../constants/messages.js';

export async function rn(filepath, newName) {
  try {
    await fs.promises.rename(filepath, newName);
    console.log(`${filepath} renamed to ${newName}`);
  } catch (err) {
    console.error(OPERATION_FAILED_MSG_RED);
  }
}