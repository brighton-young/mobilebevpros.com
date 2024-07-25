import React, { useRef } from 'react';

import NumberFormat from 'react-number-format';
import styled from 'styled-components';

import StyledInput from '../Input/StyledInput';

import { getDecimalSeparator, getThousandSeparator } from './helpers';

const StyledNumberFormat = styled(StyledInput)`
  margin-bottom: 0;
`;

type Props = {
  className?: string;
  numberFormatting?: string;
  onClick?: (ev: any) => void;
  onBlur?: () => void;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  value?: string | number;
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  showInputIcon?: boolean;
  placeholder?: string;
};

const StyledNumberField = ({
  className,
  prefix = '',
  suffix = '',
  onClick = () => {
    return null;
  },
  onBlur = () => {
    return null;
  },
  onKeyDown,
  value,
  onChange,
  numberFormatting = '#.##0,00',
  showInputIcon,
  placeholder,
}: Props) => {
  const capturedValue = useRef({});

  return (
    <StyledNumberFormat
      as={NumberFormat}
      className={className}
      prefix={prefix}
      suffix={suffix}
      onClick={onClick}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      value={value}
      isNumericString
      thousandSeparator={getThousandSeparator(numberFormatting)}
      decimalSeparator={getDecimalSeparator(numberFormatting)}
      onValueChange={(valueObject) => {
        capturedValue.current = valueObject;
      }}
      onChange={() => {
        if (!capturedValue.current) return;

        onChange(capturedValue.current.value);
      }}
      $showInputIcon={showInputIcon}
      placeholder={placeholder}
    />
  );
};

export default StyledNumberField;
