import { isWeekend } from 'date-fns';

import differenceInDays from '@cc/shared/utils/differenceInDays';
import { CalculatorSettings } from '@cc/types';

import DatePickerField from '../../../components/DatePickerField';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import { formatDate } from '../../../util/formatDate';
import getSpreadsheetEpoch from '../../../util/getSpreadsheetEpoch';
import useJumpToNextView from '../../common/hooks/useJumpToNextView';

type DateProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: DateElement;
  settings: CalculatorSettings;
  valueObject: ValueObject<
    {
      spreadsheetTime: number;
      isWeekend: 1 | 0;
      differenceToToday: number;
    },
    Date
  >;
};

export type DateElement = {
  type: 'date';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  date: {
    hasDefaultValue?: boolean;
  };
};

const DateQuestion = ({
  error,
  isHidden,
  settings,
  onValueChange,
  question,
  valueObject,
}: DateProps) => {
  const { language, messages } = settings;

  const { handleJumpToNextView } = useJumpToNextView({ question });

  const handleChange = (name, value) => {
    onValueChange(question.reference, {
      label: formatDate(value, 'P', language),
      value,
      data: {
        spreadsheetTime: getSpreadsheetEpoch(value),
        isWeekend: isWeekend(value) ? 1 : 0,
        differenceToToday: differenceInDays(value, new Date()),
      },
    });

    handleJumpToNextView();
  };

  const handleClear = () => {
    onValueChange(question.reference, {
      label: '',
      value: 0,
      error: question.isRequired ? messages.dateRequired : undefined,
    });
  };

  const validDate =
    valueObject.value instanceof Date ? valueObject.value : undefined;

  return (
    <ElementStyleWrapper
      collection="questions"
      element={question}
      isError={!!error}
      isHidden={isHidden}
    >
      <ElementTitleWrapper collection="questions" element={question}>
        <ElementClassNameWrapper element={question}>
          <DatePickerField
            className="cc__date-question-input"
            locale={language}
            name="date"
            onChange={handleChange}
            onClear={handleClear}
            value={validDate}
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

export default DateQuestion;
