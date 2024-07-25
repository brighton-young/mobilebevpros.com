import { atom } from 'recoil';

const isTestingState = atom({
  key: 'isTesting',
  default: false,
});

export default isTestingState;
