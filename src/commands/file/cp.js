import fs from 'fs';
import path from 'path';
import { OPERATION_FAILED_MSG_RED } from '../../constants/messages.js';

export async function cp(src, destDir) {
  try {
    const filename = path.basename(src);
    const dest = path.join(destDir, filename);
    await fs.promises.copyFile(src, dest);
    console.log(`Copied ${src} to ${dest}`);
  } catch (err) {
    console.error(OPERATION_FAILED_MSG_RED);
  }
}