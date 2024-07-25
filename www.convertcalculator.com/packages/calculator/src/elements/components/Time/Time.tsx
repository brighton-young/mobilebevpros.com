import { CalculatorSettings } from '@cc/types';

import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import StyledInputWrapper from '../../../components/Input/StyledInputWrapper';
import InputIcon from '../../../components/InputIcon/InputIcon';
import TimeField from '../../../components/TimeField';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import { formatDate } from '../../../util/formatDate';
import useJumpToNextView from '../../common/hooks/useJumpToNextView';

type TimeProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: TimeElement;
  settings: CalculatorSettings;
  valueObject: ValueObject<
    {
      hours: number;
      minutes: number;
    },
    Date
  >;
};

export type TimeElement = {
  type: 'time';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  visibilityEquation: string;
  time: {
    hasDefaultValue?: boolean;
    use24HourClock?: boolean;
    default12HourTimeIndicator?: 'pm' | 'am';
  };
};

const Time = ({
  error,
  isHidden,
  settings,
  onValueChange,
  question,
  valueObject,
}: TimeProps) => {
  const { messages } = settings;
  const { use24HourClock } = question.time;
  const { language } = settings;

  const { handleJumpToNextView } = useJumpToNextView({ question });

  const handleChange = (_, value) => {
    if (!value) {
      onValueChange(question.reference, {
        value: 0,
        error: question.isRequired ? messages.timeRequired : undefined,
        data: {
          hours: 0,
          minutes: 0,
        },
      });

      return;
    }

    onValueChange(question.reference, {
      label: formatDate(value, 'HH:mm', language),
      value,
      data: {
        hours: value.getHours(),
        minutes: value.getMinutes(),
      },
    });
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
          <StyledInputWrapper>
            <TimeField
              default12HourTimeIndicator={
                question.time.default12HourTimeIndicator
              }
              name="time"
              onChange={handleChange}
              onBlur={handleJumpToNextView}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  handleJumpToNextView();
                }
              }}
              value={valueObject.value}
              use24HourClock={use24HourClock}
              $showInputIcon={question.showInputIcon}
            />

            {question.showInputIcon && <InputIcon icon={question.inputIcon} />}
          </StyledInputWrapper>

          <FieldError className="cc__element-error" isVisible={!!error}>
            {error}
          </FieldError>
        </ElementClassNameWrapper>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default Time;
