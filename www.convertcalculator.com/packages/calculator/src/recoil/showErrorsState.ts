import { atom } from 'recoil';

const showErrorsState = atom({
  key: 'showErrorsState',
  default: false,
});

export default showErrorsState;
