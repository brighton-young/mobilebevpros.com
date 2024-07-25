import styled from 'styled-components';

import { CalculatorSettings } from '@cc/types';

import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import IncrementerField from '../../../components/IncrementerField';
import NumberField from '../../../components/NumberField';
import RangeComponent from '../../../components/Range';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import getInputStyleVariables from '../../../styles/styleVariables/inputStyleVariables';
import useStyles from '../../../styles/useStyles';
import getFormattedNumber from '../../../util/getFormattedNumber';
import useDimensions from '../../../util/useDimensions';
import getNumberErrorMessage from '../../common/utils/getNumberErrorMessage';

const getRangeStyleVariables = (theme) => {
  return {
    resultColor: theme.resultColor,
    thumbColor: theme.thumbColor,
    trackColor: theme.trackColor,
    activeTrackColor: theme.activeTrackColor,
  };
};

const RangeResultWrapper = styled.div`
  text-align: left;
`;

type RangeResultProps = {
  styles: {
    resultColor?: string;
  };
};

const RangeResult = styled.h4<RangeResultProps>`
  font-weight: bold;
  display: inline-block;
  min-width: 24px;
  text-align: center;
  ${({ styles }) => {
    return (
      styles.resultColor &&
      `
    color: ${styles.resultColor} !important;
  `
    );
  }}
`;

const Div = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--theme-text-color);
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexChild = styled.div`
  flex-shrink: 1;
`;

const NumberIncrementerWrapper = styled.div`
  margin-bottom: 1rem;
`;

const getSafeLeft = (left, minLeft, maxLeft) => {
  if (left <= minLeft) return minLeft;

  if (left >= maxLeft) return maxLeft;

  return left;
};

const getResultLeft = ({
  value,
  min,
  max,
  inputWidth,
  thumbWidth,
  resultWidth,
}) => {
  if (inputWidth === undefined || resultWidth === undefined) return undefined;

  const normalizedValue = (value - min) / (max - min);
  const thumbHalfWidth = thumbWidth / 2;
  const resultHalfWidth = resultWidth / 2;

  const calculatedLeft =
    normalizedValue * (inputWidth - thumbWidth) +
    thumbHalfWidth -
    resultHalfWidth;

  const minLeft = 0;
  const maxLeft = inputWidth - resultWidth;

  const left = getSafeLeft(calculatedLeft, minLeft, maxLeft);

  return left;
};

type RangeSliderProps = {
  error: string;
  isHidden: boolean;
  settings: CalculatorSettings;
  onValueChange: HandleValueChange;
  question: RangeSliderElement;
  valueObject: ValueObject;
};

export type RangeSliderElement = {
  _id: string;
  type: 'rangeSlider';
  reference: string;
  isRequired?: boolean;
  quickStyles?: any;
  rangeSlider: {
    default?: number;
    max?: number;
    min?: number;
    postfix?: string;
    prefix?: string;
    shouldAddNumberIncrementer?: boolean;
    showPostfixInValue?: boolean;
    showPrefixInValue?: boolean;
    step?: number;
    hideMinMaxLabels?: boolean;
    hideValueLabel?: boolean;
  };
};

const RangeSlider = ({
  error,
  isHidden,
  settings,
  onValueChange,
  question,
  valueObject,
}: RangeSliderProps) => {
  const { messages, numberFormatting } = settings;
  const {
    min = 0,
    max = 9999999999999,
    prefix,
    postfix,
    shouldAddNumberIncrementer,
    showPrefixInValue,
    showPostfixInValue,
    step,
  } = question.rangeSlider;

  // @ts-ignore
  const [resultRef, { width: resultWidth }] = useDimensions([
    valueObject.value,
    showPrefixInValue,
    showPostfixInValue,
  ]);

  // @ts-ignore
  const [inputRef, { width: inputWidth }] = useDimensions();

  const handleChange = (ev) => {
    const { value } = ev.target;
    const formattedValue = getFormattedNumber(
      numberFormatting,
      parseFloat(value),
    );

    onValueChange(question.reference, {
      label: `${prefix || ''}${formattedValue}${postfix || ''}`,
      value: parseFloat(value),
    });
  };

  const handleValueChange = (value) => {
    const newValue = value ? parseFloat(value) : '';
    const formattedValue = getFormattedNumber(numberFormatting, newValue);

    onValueChange(question.reference, {
      label: `${prefix || ''}${formattedValue}${postfix || ''}`,
      value: newValue,
      error: getNumberErrorMessage({
        isRequired: question.isRequired,
        max,
        messages,
        min,
        numberFormatting,
        value: newValue,
      }),
    });
  };

  const formattedValue = getFormattedNumber(
    numberFormatting,
    valueObject.value,
  );
  const formattedMin = getFormattedNumber(numberFormatting, min);
  const formattedMax = getFormattedNumber(numberFormatting, max);

  const handleNumberChange = (value: number) => {
    if (value < min || value > max) {
      handleValueChange(valueObject.value);
    } else {
      handleValueChange(value);
    }
  };

  const resultLeft = getResultLeft({
    value: valueObject.value,
    min,
    max,
    inputWidth,
    thumbWidth: 28,
    resultWidth,
  });

  const styles = useStyles({
    prefix: 'range',
    elementQuickStyles: question.quickStyles,
    getVariables: getRangeStyleVariables,
  });

  const inputStyles = useStyles({
    prefix: 'input',
    getVariables: getInputStyleVariables,
  });

  const getValue = () => {
    if (!valueObject?.value || typeof valueObject.value !== 'number')
      return undefined;
    return valueObject.value;
  };

  return (
    <ElementStyleWrapper
      collection="questions"
      element={question}
      isError={!!error}
      isHidden={isHidden}
    >
      <ElementTitleWrapper collection="questions" element={question}>
        {shouldAddNumberIncrementer && (
          <NumberIncrementerWrapper className="cc__range-question-number-incrementer">
            <IncrementerField
              max={max}
              min={min}
              acceptZero={!question.isRequired}
              name={question._id}
              onChange={(name, value) => {
                return handleNumberChange(value);
              }}
              step={step}
              value={getValue()}
            >
              <NumberField
                className="cc__number-question-input"
                numberFormatting={numberFormatting}
                prefix={prefix}
                suffix={postfix}
                onClick={(ev) => {
                  ev.stopPropagation();
                }}
                onChange={handleNumberChange}
                value={valueObject.value}
                styles={inputStyles}
                onKeyDown={undefined}
              />
            </IncrementerField>
          </NumberIncrementerWrapper>
        )}

        {Boolean(
          !shouldAddNumberIncrementer && !question.rangeSlider.hideValueLabel,
        ) && (
          <RangeResultWrapper>
            <RangeResult
              className="cc__range-question-value"
              style={{
                transform: `translateX(${resultLeft}px)`,
                visibility: resultLeft === undefined ? 'hidden' : 'visible',
              }}
              ref={resultRef}
              styles={styles}
            >
              {showPrefixInValue ? prefix : ''}
              {formattedValue}
              {showPostfixInValue ? postfix : ''}
            </RangeResult>
          </RangeResultWrapper>
        )}

        <RangeComponent
          max={max}
          min={min}
          step={step}
          value={valueObject.value}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
          onChange={handleChange}
          inputRef={inputRef}
          styles={styles}
        />

        {!question.rangeSlider.hideMinMaxLabels && (
          <Flex nested>
            <FlexChild>
              <Div className="cc__range-question-min">
                {prefix}
                {formattedMin}
                {postfix}
              </Div>
            </FlexChild>
            <FlexChild>
              <Div className="cc__range-question-max">
                {prefix}
                {formattedMax}
                {postfix}
              </Div>
            </FlexChild>
          </Flex>
        )}

        <FieldError className="cc__element-error" isVisible={!!error}>
          {error}
        </FieldError>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default RangeSlider;
