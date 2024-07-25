import { useEffect, useRef, useState } from 'react';

import { isEmpty } from 'lodash';

import useEffectDeepCompare from '@cc/shared/hooks/useEffectDeepCompare';
import type { Outputs } from '@cc/types';

import { useOutputs } from '../../../CalculatorState';
import getChangedKeysInObject from '../../../util/getChangedKeysInObject';
import getQuestionDefaultAnswers from '../../../util/getQuestionDefaultAnswers';
import setAnswersState from '../../setAnswersState';

const useDefaultAnswersMutator = ({ calculator, changedCalculatorItems }) => {
  const [initialOutputs, setInitialOutputs] = useState<Outputs | undefined>(
    undefined,
  );
  const outputs = useOutputs();

  useEffect(() => {
    if (initialOutputs) return;

    setInitialOutputs(outputs);
  }, [outputs]);

  useEffectDeepCompare(() => {
    setInitialOutputs(undefined);
  }, [changedCalculatorItems]);

  const handleSetAnswers = setAnswersState();

  const oldDefaultAnswers = useRef({});

  useEffect(() => {
    const defaultAnswers = getQuestionDefaultAnswers(
      calculator,
      initialOutputs,
    );

    const changedDefaultAnswersKeys = getChangedKeysInObject(
      oldDefaultAnswers.current,
      defaultAnswers,
    );
    // eslint-disable-next-line no-shadow
    const changedDefaultAnswers = changedDefaultAnswersKeys.reduce(
      (acc, key) => {
        return {
          ...acc,
          [key]: defaultAnswers[key],
        };
      },
      {},
    );

    if (!isEmpty(changedDefaultAnswers)) {
      handleSetAnswers(changedDefaultAnswers);
    }

    oldDefaultAnswers.current = defaultAnswers;
  }, [changedCalculatorItems, initialOutputs]);
};

export default useDefaultAnswersMutator;
