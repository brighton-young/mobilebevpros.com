import { atom } from 'recoil';

const selectedViewState = atom({
  key: 'selectedViewState',
  default: 0,
});

export default selectedViewState;
