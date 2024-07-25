import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from '../../styles';

const Input = styled.input`
  position: absolute;
  visibility: hidden;

  + label {
    position: relative;
    padding-left: 1.5rem;
    margin: 0 !important;
    cursor: pointer;
    display: block;
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
      content: '✓';
      position: absolute;
      color: ${({ theme }) => {
        return theme.checkboxColor || colors.white;
      }};
      top: calc(50% - 0.75rem);
      left: 0;
      width: 1.5rem;
      height: 1.5rem;
      text-align: center;
    }
  }

  &:not(:checked) {
    + label:after {
      opacity: 0;
      transform: scale(0);
    }
  }

  &:checked {
    + label:before {
      background: ${({ theme }) => {
        return theme.checkboxBackgroundColor || 'var(--theme-primary-color)';
      }};
      opacity: 1;
      transform: scale(1);
      border: 1px solid
        ${({ theme }) => {
          return theme.checkboxBackgroundColor || 'var(--theme-primary-color)';
        }};
    }
  }
`;

const propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  label: '',
};

const Checkbox = (props) => {
  const { label, onChange } = props;

  const handleChange = (ev) => {
    const { name, value, checked } = ev.target;

    onChange(name, value, checked);
  };

  return (
    <Input
      {...props}
      type="checkbox"
      onChange={handleChange}
      hasLabel={!!label}
    />
  );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
