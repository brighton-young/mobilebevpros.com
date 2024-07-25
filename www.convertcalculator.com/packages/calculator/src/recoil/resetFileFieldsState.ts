import { useRecoilCallback } from 'recoil';

import { CalculatorElementsEnum } from '@cc/shared/enums/calculator-elements';

import { useFormFields } from '../CalculatorState';

import answersState from './answersState';
import answerState from './answerState';

const resetFileFieldsState = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formFields = useFormFields();

  const fileFields = formFields.filter(({ type }) => {
    return (
      type === CalculatorElementsEnum.FILE ||
      type === CalculatorElementsEnum.SIGNATURE
    );
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useRecoilCallback(({ set }) => {
    return () => {
      fileFields.forEach(({ reference }) => {
        set(answerState(reference), []);

        set(answersState, (answers) => {
          return {
            ...answers,
            [reference]: [],
          };
        });
      });
    };
  }, []);
};

export default resetFileFieldsState;
