import { CallbackInterface } from 'recoil';

import calculatorState from '../../recoil/calculatorState';
import formulaItemState from '../../recoil/formulaItemState';
import { setFormulaContext } from '../../recoil/useSetFormulaContext';

const setInput = async ({
  properties,
  recoilProps,
}: {
  properties: {
    inputId: string;
    formulaId: string;
  };
  recoilProps: CallbackInterface;
}) => {
  const { snapshot } = recoilProps;

  const calculator = await snapshot.getPromise(calculatorState);

  const input = calculator.engine.inputs.find((i) => {
    return i._id === properties.inputId;
  });

  const formula = calculator.contents.variables.find((v) => {
    return v._id === properties.formulaId;
  });

  if (!input || !formula) return 0;

  const fsResult = await snapshot.getPromise(
    formulaItemState(formula.reference),
  );

  return setFormulaContext(recoilProps)({
    [input.reference]: {
      value: fsResult.result,
      type: 'context',
    },
  });
};

export default setInput;
