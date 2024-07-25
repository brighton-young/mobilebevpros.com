import React, { useEffect } from 'react';

import { type Result } from 'formulascript/interpreter';

import { useFilteredOutputs, useIsEditing } from '../../../CalculatorState';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';
import useSetFormulaContext from '../../../recoil/useSetFormulaContext';
import EditingError from '../../common/components/EditingError';

import SegmentedProgressBar from './SegmentedProgressBar';
import StyledProgressBar from './StyledProgressBar';
import StyledProgressContainer from './StyledProgressContainer';

export type ProgressBarElement = {
  _id: string;
  type: 'progressBar';
  reference: string;
  quickStyles: any;
  progressBar: {
    valueFormula: string;
    maxFormula: string;
    gap: number;
  };
};

const getNumberOrNull = (
  outputs: Record<string, Result>,
  reference: string,
): number | null => {
  const output = outputs[reference];

  if (typeof output?.result === 'number') {
    return output.result;
  }

  return null;
};

type UseProgressBarOuputs = (element: ProgressBarElement) => {
  max: number | null;
  value: number | null;
} | null;

const useProgressBarOuputs: UseProgressBarOuputs = ({
  reference,
  progressBar,
}) => {
  const valueReference = `${reference}-VALUE`;
  const maxReference = `${reference}-MAX`;

  const setFormulaContext = useSetFormulaContext();

  useEffect(() => {
    setFormulaContext({
      [valueReference]: { value: progressBar.valueFormula, type: 'formula' },
      [maxReference]: { value: progressBar.maxFormula, type: 'formula' },
    });
  }, [progressBar.valueFormula, progressBar.maxFormula]);

  const outputs = useFilteredOutputs([valueReference, maxReference]);

  if (!outputs) {
    return null;
  }

  const value = getNumberOrNull(outputs, valueReference);
  const max = getNumberOrNull(outputs, maxReference);

  return { value, max };
};

type ProgessBarProps = {
  element: ProgressBarElement;
  isHidden: boolean;
};

const ProgressBar: React.FC<ProgessBarProps> = ({ element }) => {
  const outputs = useProgressBarOuputs(element);

  if (!outputs) {
    // show skeleton while outputs are loading
    return <StyledProgressContainer />;
  }

  const { value, max } = outputs;

  if (!value || !max || value > max) {
    return (
      <EditingError>
        {(value === null && (
          <>
            <strong>Value</strong> formula does not return a number
          </>
        )) ||
          (max === null && (
            <>
              <strong>Max</strong> formula does not return a number
            </>
          )) ||
          (value > max && (
            <>
              <strong>Value</strong> cannot be greater than <strong>max</strong>
              <br />
              <div className="mt-2">
                Your <strong>value</strong> formula outputs a value ({value})
                that is greater than your <strong>max</strong> formula output (
                {max}). This is incorrect logic as your progress bar will exceed
                100%.
              </div>
              <div className="mt-2">
                The progess bar still works on the live calculator, but the bar
                will be filled 100%.
              </div>
            </>
          ))}
      </EditingError>
    );
  }

  if (element.progressBar.gap) {
    return (
      <SegmentedProgressBar
        value={value}
        max={max}
        gap={element.progressBar.gap}
      />
    );
  }

  return (
    <StyledProgressContainer>
      <StyledProgressBar value={Math.min(value, max)} max={max} />
    </StyledProgressContainer>
  );
};

const ProgressBarWrapper: React.FC<ProgessBarProps> = (props) => {
  const isEditing = useIsEditing();

  const flattenedQuickStyles = {};
  Object.entries(props.element.quickStyles || {}).forEach(
    ([key, value]: any) => {
      flattenedQuickStyles[key] = value.value;
    },
  );

  return (
    <ElementThemeProvider
      elementQuickStyles={flattenedQuickStyles}
      elementStyles={{}}
    >
      <ElementStyleWrapper
        collection="formulas"
        element={props.element}
        isEditing={isEditing}
        isHidden={props.isHidden}
      >
        <ProgressBar {...props} />
      </ElementStyleWrapper>
    </ElementThemeProvider>
  );
};

export default ProgressBarWrapper;
