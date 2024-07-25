import { atom } from 'recoil';

const isDebuggingState = atom({
  key: 'isDebugging',
  default: false,
});

export default isDebuggingState;
