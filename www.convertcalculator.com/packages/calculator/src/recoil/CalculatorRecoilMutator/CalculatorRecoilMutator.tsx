import React from 'react';

import debounceRender from 'react-debounce-render';
import { RecoilState, useSetRecoilState } from 'recoil';

import useEffectAfterInit from '@cc/shared/hooks/useEffectAfterInit';
import { CalculatorData } from '@cc/types';

import calculatorQuickStylesState from '../calculatorQuickStylesState';
import calculatorState from '../calculatorState';
import calculatorStyleState from '../calculatorStyleState';
import featureFlagsState from '../featureFlagsState';

import useCalculatorItemsMutator from './utils/useCalculatorItemsMutator';
import useDefaultAnswersMutator from './utils/useDefaultAnswersMutator';
import useFormulasMutator from './utils/useFormulasMutator';

const useMutator = ({
  value,
  atom,
  needsRefresh,
}: {
  value: any;
  atom: RecoilState<Record<string, any>>;
  needsRefresh: boolean;
}) => {
  const setState = useSetRecoilState(atom);

  useEffectAfterInit(() => {
    if (!needsRefresh) return;

    setState(value);
  }, [value]);
};

const CalculatorRecoilMutator = ({
  data,
  children,
  needsRefresh,
}: {
  data: CalculatorData;
  children: React.ReactNode;
  needsRefresh: boolean;
}) => {
  const { calculator, featureFlags } = data;
  const { style, quickStyles } = calculator;

  useMutator({ value: featureFlags, atom: featureFlagsState, needsRefresh });
  useMutator({ value: calculator, atom: calculatorState, needsRefresh });
  useMutator({ value: style, atom: calculatorStyleState, needsRefresh });
  useMutator({
    value: quickStyles,
    atom: calculatorQuickStylesState,
    needsRefresh,
  });

  useFormulasMutator({ calculator, featureFlags });

  const { changedCalculatorItems } = useCalculatorItemsMutator({
    calculator,
    needsRefresh,
  });

  useDefaultAnswersMutator({
    calculator,
    changedCalculatorItems,
  });

  return <>{children}</>;
};

const CalculatorRecoilMutatorWhenEditing = debounceRender(
  CalculatorRecoilMutator,
  300,
);

const CalculatorRecoilMutatorWithDebounce = ({
  data,
  children,
  needsRefresh,
}) => {
  if (needsRefresh) {
    return (
      <CalculatorRecoilMutatorWhenEditing
        data={data}
        needsRefresh={needsRefresh}
      >
        {children}
      </CalculatorRecoilMutatorWhenEditing>
    );
  }

  return (
    <CalculatorRecoilMutator data={data} needsRefresh={needsRefresh}>
      {children}
    </CalculatorRecoilMutator>
  );
};

export default CalculatorRecoilMutatorWithDebounce;
