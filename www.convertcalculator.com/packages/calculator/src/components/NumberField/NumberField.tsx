import React, { useRef } from 'react';

import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';

import Input from '../Input';

import { getDecimalSeparator, getThousandSeparator } from './helpers';

const StyledNumberFormat = styled(Input)`
  margin-bottom: 0;
`;

const propTypes = {
  className: PropTypes.string,
  numberFormatting: PropTypes.string,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const defaultProps = {
  className: '',
  prefix: '',
  suffix: '',
  onClick: () => {
    return null;
  },
  onBlur: () => {
    return null;
  },
  numberFormatting: '#.##0,00',
  value: undefined,
};

type NumberFieldProps = {
  className?: string;
  numberFormatting?: string;
  onClick?: () => void;
  onBlur?: () => void;
  onChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  prefix?: string;
  suffix?: string;
  value?: string;
  styles: any;
};

const NumberField: React.FC<NumberFieldProps> = ({
  onKeyDown,
  value,
  onChange,
  styles,
  numberFormatting = '#.##0,00',
  className = '',
  prefix = '',
  suffix = '',
  onClick = () => {},
  onBlur = () => {},
}) => {
  const capturedValue = useRef({});

  return (
    <StyledNumberFormat
      styles={styles}
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
    />
  );
};

NumberField.propTypes = propTypes;
NumberField.defaultProps = defaultProps;

export default NumberField;
