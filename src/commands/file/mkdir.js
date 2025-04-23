import fs from 'fs';
import { OPERATION_FAILED_MSG } from '../../constants/messages.js';

export async function mkdir(dirname) {
  try {
    await fs.promises.mkdir(dirname);
    console.log(`Directory ${dirname} created.`);
  } catch (err) {
    console.error(OPERATION_FAILED_MSG);
  }
}