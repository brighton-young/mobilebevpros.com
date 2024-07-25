import { selectorFamily } from 'recoil';

import { Output } from '@cc/types';

import formulaItemState from './formulaItemState';

// use this selector family to get the formula values of multiple items

const formulaSelectedItemsState = selectorFamily<Output[], string[]>({
  key: 'formulaSelectedItemsState',
  get: (formulaIds) => {
    return ({ get }) => {
      return formulaIds.map((formulaId) => {
        return get(formulaItemState(formulaId));
      });
    };
  },
});

export default formulaSelectedItemsState;
