import { atom } from 'recoil';

const isLiveModeState = atom({
  key: 'isLiveMode',
  default: false,
});

export default isLiveModeState;
