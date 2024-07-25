import { atom } from 'recoil';

const viewCountState = atom({
  key: 'viewCountState',
  default: 0,
});

export default viewCountState;
