import { useRecoilCallback } from 'recoil';

import calculatorItemState from './calculatorItemState';

const setCalculatorItems = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useRecoilCallback(({ set }) => {
    return (changedCalculatorItems) => {
      if (!changedCalculatorItems.length) return;

      changedCalculatorItems.forEach((calculatorItem) => {
        set(calculatorItemState(calculatorItem._id), calculatorItem);
      });
    };
  });
};

export default setCalculatorItems;
