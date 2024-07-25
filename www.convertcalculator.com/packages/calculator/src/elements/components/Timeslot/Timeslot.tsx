import { useState } from 'react';

import {
  addMinutes,
  differenceInDays,
  isEqual,
  isSameMinute,
  isWeekend,
} from 'date-fns';
import styled from 'styled-components';

import { CalculatorSettings } from '@cc/types';

import DatePickerField from '../../../components/DatePickerField';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import RadioGroup from '../../../components/RadioGroup';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import { DateLocale, getDateFormat, getTimeFormat } from '../../../i18n/dates';
import getButtonStyleVariables from '../../../styles/styleVariables/buttonStyleVariables';
import useStyles from '../../../styles/useStyles';
import { formatDate } from '../../../util/formatDate';
import getSpreadsheetEpoch from '../../../util/getSpreadsheetEpoch';
import useJumpToNextView from '../../common/hooks/useJumpToNextView';

import getTimeslots from './getTimeslots';

const StyleslotsWrapper = styled.div`
  overflow: scroll;
  margin-top: 0.5rem;
  max-height: 22rem;
`;

type TimeslotProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: TimeslotElement;
  settings: CalculatorSettings;
  valueObject: ValueObject<
    {
      spreadsheetTime: number;
      isWeekend: 1 | 0;
      differenceToToday: number;
      hours: number;
      minutes: number;
      duration: number;
      afterBufferTime: number;
    },
    Date
  >;
};

export type TimeslotElement = {
  type: 'timeslot';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  visibilityEquation: string;
  timeslot: {
    duration: number;
    afterBufferTime: number;
    availabilityRules: {
      enabled?: boolean;
      type: 'weekday' | 'date';
      intervals: { from: string; to: string }[];
      weekday?:
        | 'monday'
        | 'tuesday'
        | 'wednesday'
        | 'thursday'
        | 'friday'
        | 'saturday'
        | 'sunday';
      date?: string;
    }[];
    minBookingTime: number;
    style: {
      fontFamily: string;
      fontWeight:
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900';
      fontSize: number;
      fontSizeUnit: 'px' | 'rem' | '%';
      lineHeight: number;
      lineHeightUnit: 'px' | 'rem' | '%';
      textColor: string;
      textAlign: 'left' | 'center' | 'right' | 'justify';
      fontStyle: 'normal' | 'italic';
    };
  };
};

const TimeslotQuestion = ({
  error,
  isHidden,
  settings,
  onValueChange,
  question,
  valueObject,
}: TimeslotProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { language, messages } = settings;

  const { handleJumpToNextView } = useJumpToNextView({ question });

  const handleChange = (name, value) => {
    if (isSameMinute(valueObject.value, value)) {
      handleClear();
      return;
    }

    onValueChange(question.reference, {
      label: formatDate(
        value,
        `${getDateFormat(language as DateLocale)} ${getTimeFormat(
          language as DateLocale,
        )}`,
        language as DateLocale,
      ),
      value,
      data: {
        spreadsheetTime: getSpreadsheetEpoch(value),
        isWeekend: isWeekend(value) ? 1 : 0,
        differenceToToday: differenceInDays(value, new Date()),
        hours: value.getHours(),
        minutes: value.getMinutes(),
        duration: question.timeslot.duration,
        afterBufferTime: question.timeslot.afterBufferTime,
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

  const timeslots = getTimeslots(selectedDate, question.timeslot);

  const styles = useStyles({
    prefix: 'button',
    elementStyle: question.timeslot.style,
    getVariables: getButtonStyleVariables,
  });

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
            onChange={(name, value) => {
              return setSelectedDate(value);
            }}
            onClear={handleClear}
            value={selectedDate}
            $showInputIcon={question.showInputIcon}
            inputIcon={question.inputIcon}
          />

          {timeslots && (
            <StyleslotsWrapper>
              {timeslots.length > 0 && (
                <RadioGroup>
                  {timeslots.map((timeslot) => {
                    return (
                      <RadioGroup.Button
                        styles={styles}
                        key={timeslot}
                        onClick={() => {
                          return handleChange('timeslot', timeslot);
                        }}
                        checked={isEqual(validDate, timeslot)}
                      >
                        {formatDate(timeslot, 'HH:mm', language)} -{' '}
                        {formatDate(
                          addMinutes(timeslot, question.timeslot.duration),
                          'HH:mm',
                          language,
                        )}
                      </RadioGroup.Button>
                    );
                  })}
                </RadioGroup>
              )}

              {timeslots.length > 0 && (
                <div>No timeslots available. Choose a different date.</div>
              )}
            </StyleslotsWrapper>
          )}

          <FieldError className="cc__element-error" isVisible={!!error}>
            {error}
          </FieldError>
        </ElementClassNameWrapper>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default TimeslotQuestion;
