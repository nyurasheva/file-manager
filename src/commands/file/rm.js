import fs from 'fs';
import { OPERATION_FAILED_MSG } from '../../constants/messages.js';

export async function rm(filepath) {
  try {
    await fs.promises.unlink(filepath);
    console.log(`${filepath} has been deleted.`);
  } catch (err) {
    console.error(OPERATION_FAILED_MSG);
  }
}