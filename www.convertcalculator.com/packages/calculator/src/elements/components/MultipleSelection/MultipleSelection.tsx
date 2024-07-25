import styled from 'styled-components';

import useEffectDeepCompare from '@cc/shared/hooks/useEffectDeepCompare';
import getLetterFromIndex from '@cc/shared/utils/getLetterFromIndex';
import { CalculatorSettings } from '@cc/types';

import CheckboxComponent from '../../../components/Checkbox';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import ImageSelector from '../../../components/ImageSelector';
import Tooltip from '../../../components/Tooltip';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import getFormattedNumber from '../../../util/getFormattedNumber';
import { useOptions } from '../../common/hooks/useOptions';

const MultipleSelectionContainer = styled.div`
  ${({ isInline }) => {
    if (!isInline) return '';

    return `
      display: flex;
      flex-wrap: wrap;
      margin: 0 -0.25rem;
    `;
  }}
`;

const CheckboxWrapper = styled.div`
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  padding-left: 2.5rem !important;
  font-size: 1rem;
`;

const LabelValue = styled.span`
  font-size: 0.75rem;
`;

type MultipleSelectionProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: MultipleSelectionElement;
  settings: CalculatorSettings;
  valueObject: ValueObject<{
    checkedOptions: Record<string, boolean>;
  }>;
};

export type MultipleSelectionElement = {
  type: 'multipleSelection';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  multipleSelection: {
    defaultOption?: string;
    hasTooltips?: boolean;
    imagesPerRow?: number;
    imagesPerRowMobile?: number;
    options?: {
      image?: string;
      keywords?: string;
      label?: string;
      tooltipText?: string;
      value?: any;
    }[];

    optionsFormula?: string;
    optionsFormulaLabelColumnIndex?: number;
    optionsFormulaValueColumnIndex?: number;
    optionsFormulaImageColumnIndex?: number;
    optionsFormulaTooltipTextColumnIndex?: number;
    postfix?: string;
    prefix?: string;
    shouldBeSearcheable?: boolean;
    shouldShowValue?: boolean;
    shouldUseImages?: boolean;
    shouldUseFormulaForOptions?: boolean;
    hideLabels?: boolean;
  };
};

const MultipleSelection = ({
  error,
  isHidden,
  settings,
  onValueChange,
  question,
  valueObject,
}: MultipleSelectionProps) => {
  const { numberFormatting } = settings;
  const {
    hasTooltips,
    imagesPerRow,
    postfix,
    prefix,
    shouldShowValue,
    shouldUseImages,
    imagesPerRowMobile,
    hideLabels,
  } = question.multipleSelection;

  const options = useOptions(question);

  useEffectDeepCompare(() => {
    const newCheckedOptions = Object.entries(
      valueObject?.data?.checkedOptions || {},
    ).reduce((acc, [key, value]) => {
      const optionFound = options.find(({ _id }) => {
        return _id === key;
      });

      if (!optionFound) return acc;

      return { ...acc, [key]: value };
    }, {});

    handleValueValue(newCheckedOptions, false);
  }, [options]);

  const handleChange = (name, value) => {
    const { checkedOptions = {} } = valueObject.data || {};

    const newCheckedOptions = {
      ...checkedOptions,
      [value]: !checkedOptions[value],
    };

    return handleValueValue(newCheckedOptions, true);
  };

  const handleValueValue = (newCheckedOptions, triggerInteraction) => {
    const newValue = options.reduce(
      (object, option, index) => {
        const letter = `O${getLetterFromIndex(index)}`;

        if (!newCheckedOptions[option._id]) {
          return {
            ...object,
            data: {
              ...object.data,
              [letter]: 0,
              checkedOptions: newCheckedOptions,
            },
          };
        }

        const { labelsMap = {} } = object;
        labelsMap[letter] = option.label;

        return {
          labels: object.labels.concat(option.label),
          labelsMap,
          value: object.value + (option.value || 0),
          data: {
            ...object.data,
            [letter]: option.value,
            checkedOptions: newCheckedOptions,
          },
        };
      },
      {
        labels: [],
        labelsMap: {},
        value: 0,
      },
    );

    const hasOptionsChecked = Object.values(newCheckedOptions).reduce(
      (acc, option) => {
        if (option) return true;

        return acc;
      },
      false,
    );

    onValueChange(
      question.reference,
      {
        ...newValue,
        label: newValue.labels.join(' + '),
        error:
          question.isRequired && !hasOptionsChecked
            ? 'Select at least 1 option'
            : undefined,
      },
      triggerInteraction,
    );
  };

  const flattenedQuickStyles = {};
  Object.entries(question.quickStyles || {}).forEach(([k, v]: any) => {
    if (v.enabled) {
      flattenedQuickStyles[k] = v.value;
    }
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
            <MultipleSelectionContainer isInline={shouldUseImages}>
              {options.map((option) => {
                const isChecked =
                  valueObject.data?.checkedOptions?.[option._id];

                const formattedValue = getFormattedNumber(
                  numberFormatting,
                  option.value,
                );

                // labels can only be hidden when shouldUseImages is true
                const optionLabel =
                  hideLabels && shouldUseImages ? (
                    <></>
                  ) : (
                    <>
                      {option.label}
                      {hasTooltips && option.tooltipText && (
                        <>
                          {' '}
                          <Tooltip position="top">{option.tooltipText}</Tooltip>
                        </>
                      )}
                      {shouldShowValue && (
                        <LabelValue>
                          <br className="cc__radio-question-item-label--item-break" />
                          {prefix}
                          {formattedValue}
                          {postfix}
                        </LabelValue>
                      )}
                    </>
                  );

                if (shouldUseImages) {
                  return (
                    <ImageSelector
                      key={option._id}
                      className="cc__radio-question-item--image"
                      label={optionLabel}
                      id={`${question._id}-${option._id}`}
                      name={question._id}
                      value={option._id}
                      checked={isChecked}
                      onChange={handleChange}
                      imagesPerRow={imagesPerRow}
                      imagesPerRowMobile={imagesPerRowMobile}
                      imageUrl={option.image}
                      isHidden={isHidden}
                    />
                  );
                }

                return (
                  <CheckboxWrapper
                    key={option._id}
                    className="cc__radio-question-item"
                    onClick={(ev) => {
                      ev.stopPropagation();
                    }}
                  >
                    <CheckboxComponent
                      id={`${question._id}-${option._id}`}
                      name={question._id}
                      value={option._id}
                      checked={isChecked}
                      onChange={handleChange}
                    />
                    <Label
                      htmlFor={`${question._id}-${option._id}`}
                      className="cc__radio-question-item-label"
                    >
                      {optionLabel}
                    </Label>
                  </CheckboxWrapper>
                );
              })}
            </MultipleSelectionContainer>

            <FieldError className="cc__element-error" isVisible={!!error}>
              {error}
            </FieldError>
          </ElementClassNameWrapper>
        </ElementTitleWrapper>
      </ElementStyleWrapper>
    </ElementThemeProvider>
  );
};

export default MultipleSelection;
