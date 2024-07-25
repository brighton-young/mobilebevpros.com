import { atom } from 'recoil';

const isValidState = atom({
  key: 'isValidState',
  default: false,
});

export default isValidState;
