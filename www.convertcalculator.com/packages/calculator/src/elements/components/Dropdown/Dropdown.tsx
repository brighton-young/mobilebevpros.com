import useEffectDeepCompare from '@cc/shared/hooks/useEffectDeepCompare';
import getLetterFromIndex from '@cc/shared/utils/getLetterFromIndex';
import { CalculatorSettings } from '@cc/types';

import DropdownComponent from '../../../components/Dropdown';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import StyledInputWrapper from '../../../components/Input/StyledInputWrapper';
import InputIcon from '../../../components/InputIcon/InputIcon';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import getFormattedNumber from '../../../util/getFormattedNumber';
import { useMultipleChoiceLogic } from '../../common/hooks/useMultipleChoiceLogic';

type DropdownProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: DropdownElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type DropdownElement = {
  type: 'dropdown';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  dropdown: {
    defaultOption?: string;
    hasTooltips?: boolean;
    imagesPerRow?: number;
    options: {
      label: string;
      value: string;
      image?: string;
      tooltipText?: string;
    }[];
    optionsFormula?: string;
    optionsFormulaLabelColumnIndex?: number;
    optionsFormulaValueColumnIndex?: number;
    optionsFormulaImageColumnIndex?: number;
    optionsFormulaTooltipTextColumnIndex?: number;
    placeholder?: string;
    postfix?: string;
    prefix?: string;
    shouldBeSearcheable?: boolean;
    shouldShowValue?: boolean;
    shouldUseFormulaForOptions?: boolean;
    shouldUseImages?: boolean;
    hideClearOption?: boolean;
  };
};

const Dropdown = ({
  error,
  isHidden,
  onValueChange,
  question,
  settings,
  valueObject,
}: DropdownProps) => {
  const { numberFormatting } = settings;
  const {
    placeholder,
    postfix,
    prefix,
    shouldShowValue,
    shouldBeSearcheable,
    shouldUseImages,
    hideClearOption,
  } = question.dropdown;

  const { handleChange, handleClear, options } = useMultipleChoiceLogic({
    onValueChange,
    question,
    settings,
    valueObject,
  });

  // this is a hack to make sure the value is updated when the items change
  // it is possible for value to change even though the internal state of the component
  // has not changed. For example, when the options formula returns different options.
  // See: https://github.com/convertcalculator/convertcalculator/issues/156
  useEffectDeepCompare(() => {
    const selectedOption = options.find((option) => {
      return option._id === valueObject._id;
    });

    if (selectedOption !== undefined) {
      const selectedOptionWithData = {
        ...selectedOption,
        data: options.reduce((acc, option, index) => {
          const isSelected = option._id === selectedOption._id;

          return {
            ...acc,
            [`O${getLetterFromIndex(index)}`]: isSelected
              ? selectedOption.value
              : 0,
          };
        }, {}),
      };

      onValueChange(question.reference, selectedOptionWithData);
    }
  }, [options]);

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
              <DropdownComponent
                className="cc__select-question"
                isClearable={
                  valueObject._id &&
                  valueObject._id !== 'NO_DEFAULT' &&
                  !hideClearOption
                }
                isSearcheable={shouldBeSearcheable}
                onClear={handleClear}
                onChange={handleChange}
                $showInputIcon={question.showInputIcon}
                options={options.map((option) => {
                  const formattedValue = getFormattedNumber(
                    numberFormatting,
                    option.value,
                  );

                  return {
                    ...option,
                    label: `${option.label}${
                      shouldShowValue
                        ? ` (${prefix || ''}${formattedValue}${postfix || ''})`
                        : ''
                    }`,
                    value: option.value || 0,
                  };
                })}
                placeholder={placeholder}
                showImages={shouldUseImages}
                value={valueObject}
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

export default Dropdown;
