import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from '../../styles';

const Label = styled.label`
  padding-left: 2.5rem !important;
  font-size: 1rem;
`;

type InputProps = {
  isChecked: boolean;
};

const Input = styled.input<InputProps>`
  position: absolute;
  visibility: hidden;

  + label {
    position: relative;
    padding-left: 1.5rem;
    cursor: pointer;
    display: block;
    margin: 0 !important;
    line-height: 1.5rem;
    min-height: 1.5rem;

    &::before {
      transition: all 0.24s ease-out;
      content: '';
      position: absolute;
      left: 0;
      top: calc(50% - 0.75rem);
      width: 1.5rem;
      height: 1.5rem;
      border: 1px solid ${colors.mediumGray};
      background: #fff;
      border-radius: 50%;
    }

    &::after {
      transition: all 0.24s ease-out;
      content: ' ';
      position: absolute;
      top: calc(50% + 0.5rem - 0.75rem);
      left: 0.5rem;
      width: 0.5rem;
      height: 0.5rem;
      background: ${colors.white};
      border-radius: 50%;
    }
  }

  ${({ isChecked }) => {
    if (isChecked) {
      return `
        + label:before {
          background: var(--theme-primary-color);
          opacity: 1;
          transform: scale(1);
          border: 1px solid var(--theme-primary-color);
        }
      `;
    }

    return `
      &:not(:checked) {
        + label:after {
          opacity: 0;
          transform: scale(0);
        }
      }
    `;
  }}
`;

const propTypes = {
  onChange: PropTypes.func,
};

const defaultProps = {
  onChange: () => {
    return undefined;
  },
};

type RadioProps = {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelClassName?: string;
  label?: string;
  value: string;
  isChecked: boolean;
};

const Radio: React.FC<RadioProps> = (props) => {
  const { labelClassName, label, ...restProps } = props;

  const randomId = getRandomString();

  return (
    <>
      <Input {...restProps} id={randomId} type="radio" />
      <Label htmlFor={randomId} className={labelClassName}>
        {label}
      </Label>
    </>
  );
};

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

const getRandomString = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export default Radio;
