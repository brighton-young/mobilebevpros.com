import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { CalculatorSettings } from '@cc/types';

import { useOutput } from '../../../CalculatorState';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FormulaResult from '../../../components/FormulaResult';
import formulaContextState from '../../../recoil/formulaContextState';
import { colors } from '../../../styles';

const HiddenFormResult = styled.p`
  color: ${colors.darkGray};
`;

const FormulaResultWrapper = styled.div`
  padding: 0;
  margin: 0;
  animation: flash linear 0.4s;

  @keyframes flash {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
`;

type FormulaProps = {
  formula: FormulaElement;
  isHidden: boolean;
  settings: CalculatorSettings;
};

export type FormulaElement = {
  type: 'formula';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  formula: {
    decimals: number;
    equation: string;
    hiddenResultPlaceholder: string;
    postfix: string;
    prefix: string;
    resultStyle: {
      fontFamily: string;
      fontSize: number;
      fontSizeUnit: 'px' | 'rem' | '%';
      fontStyle: 'normal' | 'italic';
      fontWeight:
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900';
      lineHeight: number;
      lineHeightUnit: 'px' | 'rem' | '%';
      textAlign: 'left' | 'center' | 'right' | 'justify';
      textColor: string;
    };
    shouldHideResultBeforeSubmission: boolean;
  };
};

const useIsSubmitted = () => {
  const { IS_SUBMITTED: isSubmitted } = useRecoilValue(formulaContextState);
  return isSubmitted?.value;
};

const Formula = ({ formula, isHidden, settings }: FormulaProps) => {
  const { language, numberFormatting } = settings;

  const {
    decimals,
    resultStyle,
    hiddenResultPlaceholder,
    prefix,
    postfix,
    shouldHideResultBeforeSubmission,
  } = formula.formula;

  const isSubmitted = useIsSubmitted();
  const formulaResult = useOutput(formula.reference);

  return (
    <ElementStyleWrapper
      collection="formulas"
      element={formula}
      isHidden={isHidden}
    >
      <ElementTitleWrapper collection="formulas" element={formula}>
        <ElementClassNameWrapper element={formula}>
          {shouldHideResultBeforeSubmission && !isSubmitted ? (
            <HiddenFormResult className="cc__formula-hidden-result">
              {hiddenResultPlaceholder || 'Submit the form to get result...'}
            </HiddenFormResult>
          ) : (
            <FormulaResultWrapper className="cc__formula-result">
              <FormulaResult
                decimals={decimals}
                language={language}
                numberFormatting={numberFormatting}
                prefix={prefix}
                postfix={postfix}
                result={formulaResult?.result}
                elementStyle={resultStyle}
              />
            </FormulaResultWrapper>
          )}
        </ElementClassNameWrapper>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default Formula;
