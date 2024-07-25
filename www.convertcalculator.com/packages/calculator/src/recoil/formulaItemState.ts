import { atomFamily } from 'recoil';

import { Output } from '@cc/types';

const formulaItemState = atomFamily<Output, string>({
  key: 'formulaItemState',
  default: undefined,
});

export default formulaItemState;
