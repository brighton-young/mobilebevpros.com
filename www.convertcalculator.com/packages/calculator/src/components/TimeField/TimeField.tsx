import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import format from 'date-fns/format';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';

import Button from '../../elements/common/components/Button';
import { colors, textSizes } from '../../styles';
import getButtonStyleVariables from '../../styles/styleVariables/buttonStyleVariables';
import getInputStyleVariables from '../../styles/styleVariables/inputStyleVariables';
import useStyles from '../../styles/useStyles';
import Input from '../Input';

import { getDateFromFormattedTime } from './helpers';

const Flex = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const FlexChildGrowing = styled.div`
  flex-basis: 0;
  flex-grow: 1;
`;

const FlexChildShrinking = styled.div`
  flex-shrink: 1;
`;

const StyledButton = styled(Button)`
  font-size: ${textSizes.sm};
  padding: 0 0.5rem 0 0.5rem;
  margin-bottom: 0rem !important;
  height: 100%;

  background-color: ${({ backgroundColor }) => {
    return backgroundColor;
  }};
  color: ${({ textColor }) => {
    return textColor;
  }};
`;

const FirstButton = styled(StyledButton)`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

const SecondButton = styled(StyledButton)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
`;

type Props = {
  name: string;
  onBlur: (name: string, value: string) => void;
  onChange: (name: string, value: Date) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  use24HourClock?: boolean;
  value?: Date;
  default12HourTimeIndicator?: 'am' | 'pm';
  showInputIcon?: boolean;
};

const TimeField = ({
  name,
  onBlur,
  onChange,
  onKeyDown,
  use24HourClock = false,
  value,
  default12HourTimeIndicator,
  showInputIcon = false,
}: Props) => {
  const isTouching = useRef(false);

  const [formattedTime, setFormattedTime] = useState(
    value ? format(value, use24HourClock ? 'HH:mm' : 'hh:mm') : '',
  );

  const [isAm, setIsAM] = useState(
    default12HourTimeIndicator
      ? default12HourTimeIndicator === 'am'
      : parseInt(format(value, 'HH'), 10) < 12,
  );

  const buttonStyles = useStyles({
    prefix: 'button',
    getVariables: getButtonStyleVariables,
  });

  const inputStyles = useStyles({
    prefix: 'input',
    getVariables: getInputStyleVariables,
  });

  const isTouched = useRef(false);

  useEffect(() => {
    if (!isTouched.current) return;

    if (!formattedTime) {
      onChange(name, undefined);

      return;
    }

    const date = getDateFromFormattedTime(formattedTime, use24HourClock, isAm);

    onChange(name, date);
  }, [formattedTime, isAm]);

  useEffect(() => {
    if (isTouching.current) return;

    setFormattedTime(
      value ? format(value, use24HourClock ? 'HH:mm' : 'hh:mm') : '',
    );

    setIsAM(
      default12HourTimeIndicator
        ? default12HourTimeIndicator === 'am'
        : parseInt(format(value, 'HH'), 10) < 12,
    );
  }, [value]);

  const handleSetTouched = () => {
    isTouched.current = true;
    isTouching.current = true;

    window.setTimeout(() => {
      isTouching.current = false;
    }, 2000);
  };

  const handleValueChange = (valueObject) => {
    handleSetTouched();

    setFormattedTime(valueObject.formattedValue);
  };

  const handleChangeAMPM = (newIsAm) => {
    handleSetTouched();
    setIsAM(newIsAm);
  };

  const formatAsTime = (timeValue) => {
    const limit = (limitValue, max, leadingZero = true) => {
      if (limitValue.length === 1 && limitValue[0] > max[0]) {
        if (leadingZero) {
          return `0${limitValue[0]}`;
        }

        return '';
      }

      if (limitValue.length === 2 && limitValue > max) {
        return max;
      }

      return limitValue;
    };

    const hours = limit(
      timeValue.substring(0, 2),
      use24HourClock ? '23' : '12',
      true,
    );
    const minutes = limit(timeValue.substring(2, 4), '59', false);

    return `${hours}${minutes.length ? `:${minutes}` : ''}`;
  };

  const inActiveBackgroundColor = colors['gray-200'];
  const inActiveTextColor = colors['gray-700'];

  return (
    <Flex>
      <FlexChildGrowing>
        <Input
          styles={inputStyles}
          className="cc__time-field-input"
          as={NumberFormat}
          onClick={(ev) => {
            ev.stopPropagation();
          }}
          onValueChange={handleValueChange}
          name={name}
          value={formattedTime}
          format={formatAsTime}
          placeholder="--:--"
          mask={['-', '-', '-', '-']}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          $showInputIcon={showInputIcon}
        />
      </FlexChildGrowing>
      {!use24HourClock && (
        <FlexChildShrinking>
          <FirstButton
            className={classNames(
              'cc__time-field-button cc__time-field-button-am',
              {
                'is-selected': isAm,
              },
            )}
            backgroundColor={!isAm && inActiveBackgroundColor}
            textColor={!isAm && inActiveTextColor}
            styles={buttonStyles}
            onClick={() => {
              handleChangeAMPM(true);
            }}
          >
            AM
          </FirstButton>
          <SecondButton
            className={classNames(
              'cc__time-field-button cc__time-field-button-pm',
              {
                'is-selected': !isAm,
              },
            )}
            backgroundColor={isAm && inActiveBackgroundColor}
            textColor={isAm && inActiveTextColor}
            styles={buttonStyles}
            onClick={() => {
              handleChangeAMPM(false);
            }}
          >
            PM
          </SecondButton>
        </FlexChildShrinking>
      )}
    </Flex>
  );
};

export default TimeField;
