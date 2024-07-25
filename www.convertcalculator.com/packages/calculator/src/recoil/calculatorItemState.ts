import { SerializableParam, atomFamily } from 'recoil';

import type { Element } from '@cc/db';

const calculatorItemState = atomFamily<Element, SerializableParam>({
  key: 'calculatorItem',
  default: {},
});

export default calculatorItemState;
