import differenceInDays from 'date-fns/difference_in_days';
import styled from 'styled-components';

import { CalculatorSettings } from '@cc/types';

import { useCanvasSize } from '../../../CalculatorState';
import DatePickerField from '../../../components/DatePickerField';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import Label from '../../../components/Label';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import { formatDate } from '../../../util/formatDate';
import useJumpToNextView from '../../common/hooks/useJumpToNextView';

const Grid = styled.div`
  display: grid;
  align-items: center;
  row-gap: 0.5rem;
  column-gap: 1rem;

  grid-template-columns: ${({ isMobile }) => {
    return `repeat(${isMobile ? 1 : 2}, minmax(0, 1fr));`;
  }};
`;

type DatesProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: DatesElement;
  settings: CalculatorSettings;
  valueObject: ValueObject<
    {
      fromDate?: Date;
      toDate?: Date;
    },
    Date
  >;
};

export type DatesElement = {
  type: 'dates';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  dates: {
    fromLabel: string;
    toLabel: string;
  };
};

const Dates = ({
  error,
  isHidden,
  onValueChange,
  question,
  settings,
  valueObject,
}: DatesProps) => {
  const { language, messages } = settings;

  const { handleJumpToNextView } = useJumpToNextView({ question });

  const { isMobile } = useCanvasSize();

  const handleValueChange = (name, value) => {
    const newData = { ...valueObject.data, [name]: value };

    if (!newData.fromDate || !newData.toDate) {
      onValueChange(question.reference, {
        label: '',
        value: 0,
        error: question.isRequired ? messages.datesRequired : undefined,
        data: newData,
      });
    }

    if (newData.fromDate && newData.toDate) {
      const days = differenceInDays(newData.toDate, newData.fromDate);

      onValueChange(question.reference, {
        label: `${formatDate(
          newData.fromDate,
          'P',
          settings.language,
        )} - ${formatDate(
          newData.toDate,
          'P',
          settings.language,
        )} (${days} days)`,
        value: days,
        data: newData,
      });

      handleJumpToNextView();
    }
  };

  const handleClear = (name) => {
    const newData = { ...valueObject.data, [name]: undefined };

    onValueChange(question.reference, {
      label: '',
      value: 0,
      error: question.isRequired ? messages.datesRequired : undefined,
      data: newData,
    });
  };

  const validFromDate =
    !!valueObject.data && valueObject.data.fromDate instanceof Date
      ? valueObject.data.fromDate
      : undefined;
  const validToDate =
    !!valueObject.data && valueObject.data.toDate instanceof Date
      ? valueObject.data.toDate
      : undefined;

  return (
    <ElementStyleWrapper
      collection="questions"
      element={question}
      isError={!!error}
      isHidden={isHidden}
    >
      <ElementTitleWrapper collection="questions" element={question}>
        <ElementClassNameWrapper element={question}>
          <Grid isMobile={isMobile}>
            <div>
              <Label htmlFor="fromDate">{question.dates.fromLabel}</Label>
              <DatePickerField
                className="cc__dates-question-fromDate-input"
                locale={language}
                name="fromDate"
                onChange={handleValueChange}
                onClear={handleClear}
                value={validFromDate}
                $showInputIcon={question.showInputIcon}
                inputIcon={question.inputIcon}
              />
            </div>
            <div>
              <Label htmlFor="toDate">{question.dates.toLabel}</Label>
              <DatePickerField
                className="cc__dates-question-toDate-input"
                locale={language}
                name="toDate"
                onChange={handleValueChange}
                onClear={handleClear}
                value={validToDate}
                $showInputIcon={question.showInputIcon}
                inputIcon={question.inputIcon}
              />
            </div>
          </Grid>

          <FieldError className="cc__element-error" isVisible={!!error}>
            {error}
          </FieldError>
        </ElementClassNameWrapper>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default Dates;
