import { atom } from 'recoil';

import { Output } from '@cc/types';

export type FormulaContext = Record<
  string,
  {
    value: Output['result'];
    type: 'context' | 'formula';
  }
>;

const formulaContextState = atom<FormulaContext>({
  key: 'formulaContextState',
  default: {},
});

export default formulaContextState;
