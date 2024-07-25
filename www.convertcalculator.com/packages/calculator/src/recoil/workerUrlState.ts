import { atom } from 'recoil';

const workerUrlState = atom<string | undefined>({
  key: 'workerUrl',
  default: undefined,
});

export default workerUrlState;
