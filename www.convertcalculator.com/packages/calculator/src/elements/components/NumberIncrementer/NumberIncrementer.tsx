import { CalculatorSettings } from '@cc/types';

import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import IncrementerField from '../../../components/IncrementerField';
import StyledInputWrapper from '../../../components/Input/StyledInputWrapper';
import InputIcon from '../../../components/InputIcon/InputIcon';
import StyledNumberField from '../../../components/NumberField/StyledNumberField';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import getFormattedNumber from '../../../util/getFormattedNumber';
import useJumpToNextView from '../../common/hooks/useJumpToNextView';
import getNumberErrorMessage from '../../common/utils/getNumberErrorMessage';

type NumberIncrementerProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: NumberIncrementerElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type NumberIncrementerElement = {
  _id: string;
  type: 'numberIncrementer';
  reference: string;
  isRequired: boolean;
  numberIncrementer: {
    default?: number;
    max?: number;
    min?: number;
    postfix?: string;
    prefix?: string;
    shouldAddNumberIncrementer?: boolean;
    showPostfixInValue?: boolean;
    showPrefixInValue?: boolean;
    step?: number;
    excludePrefixPostfixInSubmission?: boolean;
  };
};

const NumberIncrementer = ({
  error,
  isHidden,
  onValueChange,
  question,
  settings,
  valueObject,
}: NumberIncrementerProps) => {
  const { messages, numberFormatting, color } = settings;
  const { max, min, postfix, prefix, step, excludePrefixPostfixInSubmission } =
    question.numberIncrementer;

  const { handleJumpToNextView } = useJumpToNextView({ question });

  const handleValueChange = (value) => {
    const newValue = value ? parseFloat(value) : '';
    const formattedValue = getFormattedNumber(numberFormatting, newValue);

    const label = excludePrefixPostfixInSubmission
      ? formattedValue
      : `${prefix || ''}${formattedValue}${postfix || ''}`;

    onValueChange(question.reference, {
      label,
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

  const flattenedQuickStyles = {};
  Object.entries(question.quickStyles || {}).forEach(([key, value]: any) => {
    flattenedQuickStyles[key] = value.value;
  });

  // this component does not have any styles defined
  return (
    <ElementThemeProvider
      elementStyles={{}}
      elementQuickStyles={flattenedQuickStyles}
    >
      <ElementStyleWrapper
        collection="questions"
        element={question}
        isError={!!error}
        isHidden={isHidden}
      >
        <ElementTitleWrapper collection="questions" element={question}>
          <ElementClassNameWrapper element={question}>
            <IncrementerField
              color={color}
              max={max}
              min={min}
              acceptZero={!question.isRequired}
              name={question._id}
              onChange={(name, value) => {
                handleValueChange(value);
              }}
              step={step}
              value={valueObject.value || undefined}
            >
              <StyledInputWrapper>
                <StyledNumberField
                  className="cc__number-question-input"
                  numberFormatting={numberFormatting}
                  prefix={prefix}
                  suffix={postfix}
                  onClick={(ev) => {
                    ev.stopPropagation();
                  }}
                  onChange={handleValueChange}
                  onBlur={handleJumpToNextView}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                      handleJumpToNextView();
                    }
                  }}
                  value={valueObject.value}
                  $showInputIcon={question.showInputIcon}
                />
                {question.showInputIcon && (
                  <InputIcon icon={question.inputIcon} />
                )}
              </StyledInputWrapper>
            </IncrementerField>

            <FieldError className="cc__element-error" isVisible={!!error}>
              {error}
            </FieldError>
          </ElementClassNameWrapper>
        </ElementTitleWrapper>
      </ElementStyleWrapper>
    </ElementThemeProvider>
  );
};

export default NumberIncrementer;
