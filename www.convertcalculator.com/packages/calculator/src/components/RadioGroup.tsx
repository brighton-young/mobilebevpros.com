import React from 'react';

import styled, { css } from 'styled-components';

import ButtonComponent from '../elements/common/components/Button';
import { colors } from '../styles';

import Icon from './Icon';

type StyledButtonProps = {
  checked: boolean;
  styles: {
    backgroundColor: string;
    textColor: string;
  };
};

const StyledButton = styled(ButtonComponent)<StyledButtonProps>`
  ${({ styles, checked }) => {
    return css`
      position: relative;
      padding: 1.25rem 1rem;
      text-align: left;

      background-color: ${checked
        ? styles.backgroundColor
        : colors['gray-300']};
      color: ${checked ? styles.textColor : colors['gray-700']};
    `;
  }}
`;

const CheckIconWrapper = styled.div`
  position: absolute;
  border-radius: 9999px;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: ${colors['gray-300']};
  padding: 0.115rem;
`;

const StyledRadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;
`;

type RadioGroupProps = {
  children: React.ReactNode;
  checked: boolean;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ children, checked }) => {
  return (
    <StyledRadioGroup defaultChecked={checked}>{children}</StyledRadioGroup>
  );
};

const RadioGroupButton = ({ children, checked, styles, ...props }) => {
  return (
    <StyledButton {...props} checked={checked} styles={styles}>
      {children}

      {checked && (
        <CheckIconWrapper>
          <Icon name="check" width="16px" height="16px" />
        </CheckIconWrapper>
      )}
    </StyledButton>
  );
};

RadioGroup.Button = RadioGroupButton;

export default RadioGroup;
