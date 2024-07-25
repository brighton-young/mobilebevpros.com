import classNames from 'classnames';

import { CalculatorSettings } from '@cc/types';

import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import StyledRadioGroup from '../../../components/StyledRadioGroup';
import StyledRadioGroupButton from '../../../components/StyledRadioGroupButton';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import { useMultipleChoiceLogic } from '../../common/hooks/useMultipleChoiceLogic';

type RadioGroupProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: RadioGroupElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type RadioGroupElement = {
  type: 'radioGroup';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  radioGroup: {
    defaultOption?: string;
    hasTooltips?: boolean;
    imagesPerRow?: number;
    options?: string[];
    optionsFormula?: string;
    optionsFormulaLabelColumnIndex?: number;
    optionsFormulaValueColumnIndex?: number;
    optionsFormulaImageColumnIndex?: number;
    optionsFormulaTooltipTextColumnIndex?: number;
    placeholder?: string;
    postfix?: string;
    prefix?: string;
    shouldUseFormulaForOptions?: boolean;
  };
};

const RadioGroup = ({
  error,
  isHidden,
  onValueChange,
  question,
  settings,
  valueObject,
}: RadioGroupProps) => {
  const { handleChange, options } = useMultipleChoiceLogic({
    onValueChange,
    question,
    settings,
    valueObject,
  });

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
            <StyledRadioGroup>
              {options.map((option) => {
                const isChecked = valueObject._id === option._id;
                return (
                  <StyledRadioGroupButton
                    key={option._id}
                    onClick={() => {
                      handleChange(question._id, option._id);
                    }}
                    checked={isChecked}
                    className={classNames('cc__radioGroup-question-button', {
                      'is-checked': isChecked,
                    })}
                  >
                    {option.label}
                  </StyledRadioGroupButton>
                );
              })}
            </StyledRadioGroup>

            <FieldError className="cc__element-error" isVisible={!!error}>
              {error}
            </FieldError>
          </ElementClassNameWrapper>
        </ElementTitleWrapper>
      </ElementStyleWrapper>
    </ElementThemeProvider>
  );
};

export default RadioGroup;
