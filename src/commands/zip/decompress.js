import fs from 'fs';
import zlib from 'zlib';
import { OPERATION_FAILED_MSG_RED } from '../../constants/messages.js';

export async function decompress(src, dest) {
  try {
    const readStream = fs.createReadStream(src);
    const brotli = zlib.createBrotliDecompress();
    const writeStream = fs.createWriteStream(dest);

    readStream.pipe(brotli).pipe(writeStream);

    writeStream.on('finish', () => {
      console.log(`File decompressed to ${dest}`);
    });
    readStream.on('error', () => console.log(OPERATION_FAILED_MSG_RED));
    writeStream.on('error', () => console.log(OPERATION_FAILED_MSG_RED));
  } catch {
    console.log(OPERATION_FAILED_MSG_RED);
  }
}
