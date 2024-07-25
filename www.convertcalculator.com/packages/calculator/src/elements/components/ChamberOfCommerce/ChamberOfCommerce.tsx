/* eslint-disable camelcase */
import { CalculatorSettings } from '@cc/types';

import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import SearchField from '../../../components/SearchField';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import useFetchCompanyDetails from '../../../effects/useFetchCompanyDetails';
import useFetchCompanySuggestions from '../../../effects/useFetchCompanySuggestions';
import useJumpToNextView from '../../common/hooks/useJumpToNextView';

type ChamberOfCommerceProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: CocElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type CocElement = {
  type: 'chamberOfCommerce';
  _id: string;
  isRequired: boolean;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  chamberOfCommerce: {
    placeholder: string;
  };
  showInputIcon: boolean;
  inputIcon?: string;
};

const ChamberOfCommerce = ({
  error,
  isHidden,
  settings,
  onValueChange,
  question,
}: ChamberOfCommerceProps) => {
  const { language, messages } = settings;

  const { chamberOfCommerce } = question;

  const fetchCompanySuggestions = useFetchCompanySuggestions();
  const fetchCompanyDetails = useFetchCompanyDetails();

  const { handleJumpToNextView } = useJumpToNextView({ question });

  const handleChange = async (
    _name: string,
    option?: {
      label: string;
      value: string;
    },
  ) => {
    if (!option) {
      onValueChange(question.reference, {
        label: '',
        value: 0,
        error: messages.answerRequired,
        data: {
          straatnaam: '',
          huisnummer: '',
          huisletter: '',
          postcode: '',
          plaats: '',
        },
      });

      return;
    }

    const details = await fetchCompanyDetails(option.value as string);

    const value = {
      label: option.label,
      value: option.value,
      error: question.isRequired ? messages.answerRequired : undefined,
      data: details,
    };

    onValueChange(question.reference, value);

    handleJumpToNextView();
  };

  return (
    <ElementStyleWrapper
      collection="questions"
      element={question}
      isError={!!error}
      isHidden={isHidden}
    >
      <ElementTitleWrapper collection="questions" element={question}>
        <ElementClassNameWrapper element={question}>
          <SearchField
            className="cc__search-question-input"
            options={{
              language,
            }}
            name="coc"
            onChange={handleChange}
            onFetchSuggestions={fetchCompanySuggestions}
            placeholder={chamberOfCommerce.placeholder || undefined}
            $showInputIcon={question.showInputIcon}
            inputIcon={question.inputIcon}
          />

          <FieldError className="cc__element-error" isVisible={!!error}>
            {error}
          </FieldError>
        </ElementClassNameWrapper>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default ChamberOfCommerce;
