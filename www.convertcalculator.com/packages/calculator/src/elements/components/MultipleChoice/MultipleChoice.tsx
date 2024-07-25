import styled from 'styled-components';

import type { CalculatorSettings } from '@cc/types';

import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import ImageSelector from '../../../components/ImageSelector';
import RadioComponent from '../../../components/Radio';
import Tooltip from '../../../components/Tooltip';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import getFormattedNumber from '../../../util/getFormattedNumber';
import EditingError from '../../common/components/EditingError';
import { useMultipleChoiceLogic } from '../../common/hooks/useMultipleChoiceLogic';

type MultipleChoiceContainerProps = {
  isInline: boolean;
};

const MultipleChoiceContainer = styled.div<MultipleChoiceContainerProps>`
  ${({ isInline }) => {
    if (!isInline) return '';

    return `
      display: flex;
      flex-wrap: wrap;
      margin: 0 -0.25rem;
    `;
  }}
`;

const RadioWrapper = styled.div`
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LabelValue = styled.span`
  font-size: 0.75rem;
`;

type MultipleChoiceProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: MultipleChoiceElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type MultipleChoiceElement = {
  type: 'multipleChoice';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  multipleChoice: {
    defaultOption?: string;
    hasTooltips?: boolean;
    imagesPerRow?: number;
    imagesPerRowMobile?: number;
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
    hideLabels?: boolean;
  };
};

const MultipleChoice = ({
  error,
  isHidden,
  onValueChange,
  question,
  settings,
  valueObject,
}: MultipleChoiceProps) => {
  const { numberFormatting } = settings;
  const {
    hasTooltips,
    imagesPerRow,
    imagesPerRowMobile,
    postfix,
    prefix,
    shouldShowValue,
    shouldUseImages,
    hideLabels,
  } = question.multipleChoice;

  const { handleChange, options } = useMultipleChoiceLogic({
    onValueChange,
    question,
    settings,
    valueObject,
  });

  return (
    <ElementStyleWrapper
      collection="questions"
      element={question}
      isError={!!error}
      isHidden={isHidden}
    >
      <ElementTitleWrapper collection="questions" element={question}>
        <ElementClassNameWrapper element={question}>
          <MultipleChoiceContainer isInline={shouldUseImages}>
            {options.map((option) => {
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
                // falsy values are allowed and will show a placeholder image
                if (Boolean(option.image) && typeof option.image !== 'string') {
                  return (
                    <EditingError key={option._id}>
                      Invalid image URL: &apos;{option.image}&apos;
                    </EditingError>
                  );
                }

                return (
                  <ImageSelector
                    key={option._id}
                    className="cc__radio-question-item--image"
                    id={option._id}
                    name={question._id}
                    value={option._id}
                    checked={option._id === valueObject._id}
                    onChange={handleChange}
                    imagesPerRow={imagesPerRow}
                    imagesPerRowMobile={imagesPerRowMobile}
                    imageUrl={option.image}
                    label={optionLabel}
                    isHidden={isHidden}
                  />
                );
              }

              return (
                <RadioWrapper
                  key={option._id}
                  className="cc__radio-question-item"
                  onClick={(ev) => {
                    ev.stopPropagation();
                  }}
                >
                  <RadioComponent
                    labelClassName="cc__radio-question-item-label"
                    label={optionLabel}
                    name={question._id}
                    value={option._id}
                    isChecked={option._id === valueObject._id}
                    onClick={(ev) => {
                      const { name, value } = ev.target;

                      handleChange(name, value);
                    }}
                  />
                </RadioWrapper>
              );
            })}
          </MultipleChoiceContainer>

          <FieldError className="cc__element-error" isVisible={!!error}>
            {error}
          </FieldError>
        </ElementClassNameWrapper>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default MultipleChoice;
