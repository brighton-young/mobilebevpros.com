import { atom } from 'recoil';

const fingerprintState = atom({
  key: 'fingerprintState',
  default: undefined,
});

export default fingerprintState;
