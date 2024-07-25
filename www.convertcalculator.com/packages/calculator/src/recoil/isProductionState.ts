import { atom } from 'recoil';

const isProductionState = atom({
  key: 'isProduction',
  default: false,
});

export default isProductionState;
