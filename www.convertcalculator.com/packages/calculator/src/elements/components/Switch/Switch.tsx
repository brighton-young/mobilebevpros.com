import { CalculatorSettings } from '@cc/types';

import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementInlineTitleWrapper from '../../../components/ElementInlineTitleWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import FieldError from '../../../components/FieldError';
import SwitchComponent from '../../../components/Switch';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';

type SwitchProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: SwitchElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type SwitchElement = {
  type: 'switch';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  visibilityEquation: string;
  switch: {
    defaultValue?: boolean;
  };
};

const Switch = ({
  isHidden,
  error,
  onValueChange,
  question,
  settings,
  valueObject,
}: SwitchProps) => {
  const { messages } = settings;

  const handleChange = (value) => {
    onValueChange(question.reference, {
      label: value ? 'Yes' : 'No',
      value: value ? 1 : 0,
      error:
        !value && question.isRequired ? messages.switchRequired : undefined,
    });
  };

  return (
    <ElementStyleWrapper
      collection="questions"
      element={question}
      isError={!!error}
      isHidden={isHidden}
    >
      <ElementInlineTitleWrapper collection="questions" element={question}>
        <ElementClassNameWrapper element={question}>
          <SwitchComponent
            name={question._id}
            value={valueObject.value}
            checked={!!valueObject.value}
            onChange={(ev) => {
              const { checked } = ev.target;

              handleChange(checked);
            }}
          />
        </ElementClassNameWrapper>
      </ElementInlineTitleWrapper>

      <FieldError className="cc__element-error" isVisible={!!error}>
        {error}
      </FieldError>
    </ElementStyleWrapper>
  );
};

export default Switch;
