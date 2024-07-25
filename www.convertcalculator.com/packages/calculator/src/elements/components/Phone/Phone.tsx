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
import getPhoneErrorMessage from '../../../util/getPhoneErrorMessage';
import useJumpToNextView from '../../common/hooks/useJumpToNextView';

import { PhoneInput } from './components/PhoneInput/PhoneInput';

const acceptedKeys = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '+',
  '-',
  ' ',
];

type PhoneProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: PhoneElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type PhoneElement = {
  type: 'phone';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  phone: {
    placeholder?: string;
    includeCountryCode?: boolean;
    defaultCountry?: string;
  };
};

const Phone = ({
  error,
  isHidden,
  question,
  onValueChange,
  settings,
  valueObject,
}: PhoneProps) => {
  const { messages } = settings;
  const { _id, phone } = question;
  const { placeholder, includeCountryCode, defaultCountry } = phone;

  const { handleJumpToNextView } = useJumpToNextView({
    question,
  });

  const handleChange = (value) => {
    const newError = getPhoneErrorMessage({
      isRequired: question.isRequired,
      messages,
      value,
      includeCountryCode,
      validatePhoneNumber: true,
    });

    onValueChange(question.reference, {
      label: value,
      value: !!value && !newError ? 1 : 0,
      error: newError,
      data: {
        phone: value,
      },
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
            {includeCountryCode ? (
              <PhoneInput
                name={_id}
                placeholder={placeholder}
                value={valueObject.label || ''}
                onChange={(value) => {
                  handleChange(value);
                }}
                defaultCountry={defaultCountry}
              />
            ) : (
              <StyledInputWrapper>
                <StyledInput
                  className="cc__phone-question-input"
                  type="tel"
                  name={_id}
                  value={valueObject.label || ''}
                  onChange={(ev) => {
                    const { value } = ev.target;
                    handleChange(value);
                  }}
                  onBlur={handleJumpToNextView}
                  onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      handleJumpToNextView();
                    }

                    if (!acceptedKeys.includes(ev.key)) {
                      ev.preventDefault();
                    }
                  }}
                  placeholder={placeholder}
                  $showInputIcon={question.showInputIcon}
                />
                {question.showInputIcon && (
                  <InputIcon icon={question.inputIcon} />
                )}
              </StyledInputWrapper>
            )}

            <FieldError className="cc__element-error" isVisible={!!error}>
              {error}
            </FieldError>
          </ElementClassNameWrapper>
        </ElementTitleWrapper>
      </ElementStyleWrapper>
    </ElementThemeProvider>
  );
};

export default Phone;
