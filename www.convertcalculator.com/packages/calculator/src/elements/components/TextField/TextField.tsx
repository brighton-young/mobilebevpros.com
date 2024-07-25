import TextareaAutosize from 'react-autosize-textarea';

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

type TextFieldProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: TextFieldElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type TextFieldElement = {
  type: 'textField';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  visibilityEquation: string;
  textField: {
    multiline?: boolean;
    placeholder?: string;
    validation?: '' | 'url';
  };
};

const TextField = ({
  error,
  isHidden,
  onValueChange,
  question,
  settings,
  valueObject,
}: TextFieldProps) => {
  const { messages } = settings;
  const { _id, isRequired, textField } = question;
  const { multiline, placeholder, validation } = textField;

  const { handleJumpToNextView } = useJumpToNextView({
    question,
  });

  const handleChange = (ev) => {
    const { value: newValue } = ev.target;

    const newError = getError({
      isRequired,
      messages,
      value: newValue,
      validation,
    });

    onValueChange(question.reference, {
      label: newValue,
      value: !!newValue && !newError ? 1 : 0,
      error: newError,
      data: {
        text: newValue,
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
              {multiline ? (
                <StyledInput
                  className="cc__textField-question-textarea"
                  // @ts-ignore
                  as={TextareaAutosize}
                  name={_id}
                  value={valueObject.label}
                  onChange={handleChange}
                  onBlur={handleJumpToNextView}
                  placeholder={placeholder}
                  $showInputIcon={question.showInputIcon}
                />
              ) : (
                <StyledInput
                  className="cc__textField-question-input"
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
              )}
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

const getError = ({ isRequired, messages, value, validation }) => {
  if (isRequired && !value) return messages.answerRequired;

  if (validation === 'url') {
    // eslint-disable-next-line prefer-regex-literals
    const regEx = new RegExp(
      /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i,
    );

    const isValidUrl = regEx.test(value);

    if (!isValidUrl)
      return (
        messages.textFieldNotValidUrl ||
        'Please enter a valid url (e.g. https://www.convertcalculator.com)'
      );
  }

  return null;
};

export default TextField;
