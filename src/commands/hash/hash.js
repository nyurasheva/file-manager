import fs from 'fs';
import crypto from 'crypto';
import { OPERATION_FAILED_MSG } from '../../constants/messages.js';

export async function hash(filepath) {
  try {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filepath);

    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => {
      const digest = hash.digest('hex');
      console.log(digest);
    });
    stream.on('error', () => {
      console.log(OPERATION_FAILED_MSG);
    });
  } catch {
    console.log(OPERATION_FAILED_MSG);
  }
}