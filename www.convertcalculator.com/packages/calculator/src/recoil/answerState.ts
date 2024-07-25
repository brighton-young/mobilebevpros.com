import { atomFamily } from 'recoil';

import { ValueObject } from '../components/TreeItemElementRenderer';

const answerState = atomFamily<ValueObject, string>({
  key: 'answerState',
  default: {},
});

export default answerState;
