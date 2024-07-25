import { CalculatorSettings } from '@cc/types';

import CheckboxComponent from '../../../components/Checkbox';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementInlineTitleWrapper from '../../../components/ElementInlineTitleWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementThemeProvider from '../../../components/ElementThemeProvider/ElementThemeProvider';
import FieldError from '../../../components/FieldError';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';

type CheckboxProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: CheckboxElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type CheckboxElement = {
  type: 'checkbox';
  _id: string;
  reference: string;
  checkbox: {
    defaultValue: boolean;
  };
};

const Checkbox = ({
  error,
  isHidden,
  onValueChange,
  question,
  settings,
  valueObject,
}: CheckboxProps) => {
  const { messages } = settings;

  const handleChange = (value) => {
    onValueChange(question.reference, {
      label: value ? 'Yes' : 'No',
      value: value ? 1 : 0,
      error:
        !value && question.isRequired ? messages.switchRequired : undefined,
    });
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
        <ElementInlineTitleWrapper collection="questions" element={question}>
          <ElementClassNameWrapper element={question}>
            <CheckboxComponent
              id={question._id}
              name={question._id}
              value={valueObject.value}
              checked={!!valueObject.value}
              onChange={(_, __, checked) => {
                handleChange(checked);
              }}
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor={question._id} />
          </ElementClassNameWrapper>
        </ElementInlineTitleWrapper>

        <FieldError className="cc__element-error" isVisible={!!error}>
          {error}
        </FieldError>
      </ElementStyleWrapper>
    </ElementThemeProvider>
  );
};

export default Checkbox;
