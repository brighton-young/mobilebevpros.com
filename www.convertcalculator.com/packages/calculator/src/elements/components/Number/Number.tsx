import { CalculatorSettings } from '@cc/types';

import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
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

type NumberProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: NumberElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type NumberElement = {
  _id: string;
  type: 'number';
  reference: string;
  isRequired: boolean;
  // TODO: type properly
  quickStyles?: any;
  number: {
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
    placeholder?: string;
  };
};

const Number = ({
  error,
  isHidden,
  onValueChange,
  question,
  settings,
  valueObject,
}: NumberProps) => {
  const { messages, numberFormatting } = settings;
  const { max, min, prefix, postfix, excludePrefixPostfixInSubmission } =
    question.number;

  const handleValueChange = (value) => {
    const newValue = value ? parseFloat(value) : 0;
    const formattedValue = getFormattedNumber(numberFormatting, newValue);

    const label = excludePrefixPostfixInSubmission
      ? formattedValue
      : `${prefix || ''}${formattedValue}${postfix || ''}`;

    onValueChange(question.reference, {
      label,
      value: newValue,
      data: {
        isEmpty: !value,
      },
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

  const { handleJumpToNextView } = useJumpToNextView({ question });

  const flattenedQuickStyles = {};
  Object.entries(question.quickStyles || {}).forEach(([key, value]: any) => {
    flattenedQuickStyles[key] = value.value;
  });

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
                value={valueObject?.data?.isEmpty ? '' : valueObject.value}
                $showInputIcon={question.showInputIcon}
                placeholder={question.number.placeholder}
              />
              {question.showInputIcon && (
                <InputIcon icon={question.inputIcon} />
              )}
            </StyledInputWrapper>
            <FieldError className="cc__element-error" isVisible={!!error}>
              {error}
            </FieldError>
          </ElementClassNameWrapper>
        </ElementTitleWrapper>
      </ElementStyleWrapper>
    </ElementThemeProvider>
  );
};

export default Number;
