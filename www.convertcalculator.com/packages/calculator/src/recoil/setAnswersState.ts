import { useRecoilCallback } from 'recoil';

import answersState from './answersState';
import answerState from './answerState';

const setAnswers = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useRecoilCallback(({ set }) => {
    return (answers) => {
      Object.entries(answers).forEach(([reference, answer]) => {
        set(answerState(reference), answer);
        set(answersState, (origAnswers) => {
          return { ...origAnswers, [reference]: answer };
        });
      });
    };
  }, []);
};

export default setAnswers;
