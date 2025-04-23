import {
  up,
  cd,
  ls
} from './navigation.js';

export async function handleCommand(input) {
  const [cmd, ...args] = input.split(' ');

  switch (cmd) {
    case 'up':
      await up();
      break;
    case 'cd':
      await cd(args[0]);
      break;
    case 'ls':
      await ls();
      break;
    default:
      console.log('Invalid input');
  }
}
