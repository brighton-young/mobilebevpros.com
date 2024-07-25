import { CalculatorSettings } from '@cc/types';

import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import StyledInput from '../../../components/Input/StyledInput';
import StyledInputWrapper from '../../../components/Input/StyledInputWrapper';
import InputIcon from '../../../components/InputIcon/InputIcon';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import useJumpToNextView from '../../common/hooks/useJumpToNextView';

type CouponProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: CouponElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type CouponElement = {
  type: 'coupon';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  coupon: {
    items: {
      _id: string;
      amountOff: number;
      code: string;
      label: string;
      percentageOff: number;
      type: 'percentage' | 'amount';
    }[];
    placeholder: string;
  };
};

const Coupon = ({
  error,
  isHidden,
  onValueChange,
  question,
  settings,
  valueObject,
}: CouponProps) => {
  const { messages } = settings;
  const { items, placeholder } = question.coupon;

  const { handleJumpToNextView } = useJumpToNextView({ question });

  const handleChange = (ev) => {
    const { value: newValue } = ev.target;

    const matchedCoupon = items.find((item) => {
      return item.code.toLowerCase() === newValue.toLowerCase();
    });

    if (!matchedCoupon) {
      onValueChange(question.reference, {
        label: '',
        value: 0,
        error: question.isRequired ? messages.couponRequired : undefined,
        data: { label: newValue },
      });

      return;
    }

    onValueChange(question.reference, {
      label: matchedCoupon.label,
      value:
        matchedCoupon.type === 'percentage'
          ? matchedCoupon.percentageOff || 0
          : matchedCoupon.amountOff || 0,
      data: { ...matchedCoupon, label: newValue },
    });

    handleJumpToNextView();
  };

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
              <StyledInput
                name={question._id}
                value={valueObject?.data?.label}
                onChange={handleChange}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter') {
                    handleJumpToNextView();
                  }
                }}
                placeholder={placeholder}
                $showInputIcon={question.showInputIcon}
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

export default Coupon;
