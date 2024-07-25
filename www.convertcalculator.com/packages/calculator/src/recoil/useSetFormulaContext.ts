import { CallbackInterface, useRecoilCallback } from 'recoil';

import formulaContextState, { FormulaContext } from './formulaContextState';

export const setFormulaContext = ({ set }: CallbackInterface) => {
  return (newFormulaContext: FormulaContext) => {
    set(formulaContextState, (orig) => {
      return { ...orig, ...newFormulaContext };
    });
  };
};

const useSetFormulaContext = () => {
  return useRecoilCallback(setFormulaContext, []);
};

export default useSetFormulaContext;
