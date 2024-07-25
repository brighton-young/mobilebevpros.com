import { atomFamily } from 'recoil';

const selectedIndexOfViewContainerState = atomFamily<number, string>({
  key: 'selectedIndexOfViewContainerState',
  default: 0,
});

export default selectedIndexOfViewContainerState;
