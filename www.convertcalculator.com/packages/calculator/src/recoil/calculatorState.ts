import { atom } from 'recoil';

import type { CalculatorContent } from '../types';

const calculatorState = atom<CalculatorContent & { title: string }>({
  key: 'calculatorState',
  default: undefined,
});

export default calculatorState;
