import { atom } from 'recoil';

const canvasWidthState = atom({
  key: 'canvasWidthState',
  default: 1200,
});

export default canvasWidthState;
