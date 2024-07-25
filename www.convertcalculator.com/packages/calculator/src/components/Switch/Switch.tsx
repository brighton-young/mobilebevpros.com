import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from '../../styles';

const HEIGHT = 24;

const SwitchContainer = styled.div`
  height: ${HEIGHT}px;
  position: relative;
  outline: 0;
  font-size: 1rem;
  font-weight: bold;
  color: ${colors.white};
  user-select: none;
`;

const SwitchLabel = styled.label`
  margin: 0 !important;
  display: inline-block;
  vertical-align: baseline;
  cursor: pointer;
  position: relative;
  width: ${HEIGHT * 2}px;
  height: ${HEIGHT}px;
  border-radius: 1000px;
  background: ${colors['gray-400']};
  transition: all 0.25s ease-out;
  font-weight: inherit;
  color: inherit;

  &::after {
    position: absolute;
    top: ${HEIGHT * 0.175}px;
    left: ${HEIGHT * 0.175}px;
    display: block;
    width: ${HEIGHT * 0.65}px;
    height: ${HEIGHT * 0.65}px;
    transform: translate3d(0, 0, 0);
    border-radius: 50%;
    background: ${colors.white};
    transition: all 0.25s ease-out;
    content: '';
  }
`;

const SwitchInput = styled.input`
  display: block;
  position: absolute;
  margin-bottom: 0;
  opacity: 0;

  &:checked ~ ${SwitchLabel} {
    background: var(--theme-primary-color);

    &::after {
      left: ${HEIGHT * 1.125}px;
    }
  }
`;

const propTypes = {
  name: PropTypes.string.isRequired,
};

const Switch = (props) => {
  const { name } = props;

  return (
    <SwitchContainer
      onClick={(ev) => {
        ev.stopPropagation();
      }}
    >
      <SwitchInput {...props} id={name} type="checkbox" />
      <SwitchLabel htmlFor={name} />
    </SwitchContainer>
  );
};

Switch.propTypes = propTypes;

export default Switch;
