import { CalculatorSettings } from '@cc/types';

import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import SignatureField from '../../../components/SignatureField';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';

type SignatureProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: SignatureElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type SignatureElement = {
  type: 'signature';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  signature: {};
};

const Signature = ({
  error,
  isHidden,
  onValueChange,
  question,
  settings,
  valueObject,
}: SignatureProps) => {
  const { messages } = settings;

  const handleChange = (_, value) => {
    if (value) {
      onValueChange(question.reference, {
        label: value.url,
        value: 1,
        data: {
          files: [value],
        },
      });
    } else {
      onValueChange(question.reference, {
        label: '',
        value: 0,
        error: question.isRequired ? messages.signatureRequired : undefined,
        data: {
          files: [],
        },
      });
    }
  };

  const value = valueObject.data ? valueObject.data.files : [];

  return (
    <ElementStyleWrapper
      collection="questions"
      element={question}
      isError={!!error}
      isHidden={isHidden}
    >
      <ElementTitleWrapper collection="questions" element={question}>
        <ElementClassNameWrapper element={question}>
          <SignatureField
            name="signature"
            isHidden={isHidden}
            onChange={handleChange}
            value={value}
          />

          <FieldError className="cc__element-error" isVisible={!!error}>
            {error}
          </FieldError>
        </ElementClassNameWrapper>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default Signature;
