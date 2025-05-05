const state = {
  username: '',
  cwd: '',
};

export function setState(key, value) {
  state[key] = value;
}

export function getState() {
  return state;
}
