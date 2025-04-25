import {
  FG_RED,
  FG_MAGENTA,
  BRIGHT,
  RESET
} from './colors.js'

export const GREETING_MSG = 'Welcome to the File Manager,';
export const THANKS_MSG = 'Thank you for using File Manager,';
export const CURRENT_DIR_MSG = 'You are currently in';
export const INVALID_CMD_MESSAGE = 'Invalid input';
export const INVALID_CMD_MESSAGE_MAGENTA = `${FG_MAGENTA}${INVALID_CMD_MESSAGE}${RESET}`;
export const OPERATION_FAILED_MSG = 'Operation failed';
export const OPERATION_FAILED_MSG_RED = `${FG_RED}${BRIGHT}${OPERATION_FAILED_MSG}${RESET}`;
export const EXIT_CMD = '.exit';