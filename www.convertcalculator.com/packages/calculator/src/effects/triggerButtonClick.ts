import { CallbackInterface } from 'recoil';

import type { ButtonElement } from '@cc/db';

import answersState from '../recoil/answersState';
import calculatorIdState from '../recoil/calculatorIdState';
import formulasState from '../recoil/formulasState';
import triggerEvent from '../util/triggerEvent';

const triggerButtonClick = (recoilProps: CallbackInterface) => {
  return async ({ element }: { element: ButtonElement }) => {
    const { snapshot } = recoilProps;

    const calculatorId = await snapshot.getPromise(calculatorIdState);
    const answers = await snapshot.getPromise(answersState);
    const outputs = await snapshot.getPromise(formulasState);

    triggerEvent({
      calculatorId,
      type: 'buttonClick',
      payload: {
        reference: element.reference,
        answers,
        outputs,
      },
    });
  };
};

export default triggerButtonClick;
