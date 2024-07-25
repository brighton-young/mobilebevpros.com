import React from 'react';

import { CalculatorSettings } from '@cc/types';

import ButtonGroupComponent from '../../../components/ButtonGroup';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import { useMultipleChoiceLogic } from '../../common/hooks/useMultipleChoiceLogic';

type ButtonGroupProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: ButtonGroupElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type ButtonGroupElement = {
  _id: string;
  type: 'buttonGroup';
  reference: string;
  buttonGroup: {
    defaultOption?: string | null;
    hasTooltips: boolean;
    imagesPerRow?: number | null;
    options: {
      label: string;
      value: string;
      image?: string | null;
      tooltipText?: string | null;
    }[];
    optionsFormula?: string | null;
    optionsFormulaLabelColumnIndex?: number | null;
    optionsFormulaValueColumnIndex?: number | null;
    optionsFormulaImageColumnIndex?: number | null;
    optionsFormulaTooltipTextColumnIndex?: number | null;
    placeholder?: string | null;
    postfix?: string | null;
    prefix?: string | null;
    shouldBeSearcheable: boolean;
    shouldShowValue?: boolean | null;
    shouldUseFormulaForOptions?: boolean | null;
    shouldUseImages?: boolean | null;
    gutters?: number | null;
    cannotDeselect?: boolean;
  };
};

const ButtonGroup = ({
  error,
  isHidden,
  onValueChange,
  question,
  settings,
  valueObject,
}: ButtonGroupProps) => {
  const { numberFormatting } = settings;
  const {
    hasTooltips,
    postfix,
    prefix,
    shouldShowValue,
    cannotDeselect = false,
  } = question.buttonGroup;

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
            <ButtonGroupComponent
              gutters={question.buttonGroup.gutters}
              options={options}
              handleChange={(newOptionId) => {
                handleChange(question._id, newOptionId);
              }}
              selectedId={valueObject._id}
              numberFormatting={numberFormatting}
              shouldShowValue={shouldShowValue}
              prefix={prefix}
              postfix={postfix}
              hasTooltips={hasTooltips}
              cannotDeselect={cannotDeselect}
            />
            <FieldError className="cc__element-error" isVisible={!!error}>
              {error}
            </FieldError>
          </ElementClassNameWrapper>
        </ElementTitleWrapper>
      </ElementStyleWrapper>
    </ElementThemeProvider>
  );
};

export default ButtonGroup;
