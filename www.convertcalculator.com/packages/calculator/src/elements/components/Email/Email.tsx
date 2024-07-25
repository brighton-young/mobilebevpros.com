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
import getEmailErrorMessage from '../../../util/getEmailErrorMessage';
import useJumpToNextView from '../../common/hooks/useJumpToNextView';

type EmailProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: EmailElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type EmailElement = {
  type: 'email';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  email: {
    placeholder?: string;
  };
};

const Email = ({
  error,
  isHidden,
  question,
  onValueChange,
  settings,
  valueObject,
}: EmailProps) => {
  const { messages } = settings;
  const { _id, email } = question;
  const { placeholder } = email;

  const { handleJumpToNextView } = useJumpToNextView({
    question,
  });

  const handleChange = (ev) => {
    const { value } = ev.target;

    const newError = getEmailErrorMessage({
      isRequired: question.isRequired,
      messages,
      email: value,
    });

    onValueChange(question.reference, {
      label: value,
      value: !!value && !newError ? 1 : 0,
      error: newError,
      data: {
        email: value,
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
            <StyledInputWrapper>
              <StyledInput
                className="cc__email-question-input"
                name={_id}
                value={valueObject.label || ''}
                onChange={handleChange}
                onBlur={handleJumpToNextView}
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

export default Email;
