import React from 'react';

import styled from 'styled-components';

import Icon from '../Icon';
import IconButton from '../IconButton';

const StyledIconButton = styled(IconButton)`
  ${({ theme }) => {
    return `
      color: ${
        theme.numberIncrementerButtonBackgroundColor ||
        'var(--theme-primary-color)'
      };
    
    `;
  }}
`;

const Flex = styled.div`
  display: flex;
  justify-content: ${(props) => {
    return props.alignment === 'left' ? 'justify-start' : 'center';
  }};
  align-items: center;
`;

const FlexChild = styled.div`
  flex-shrink: 1;
`;
const PaddedDiv = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

type IncrementerProps = {
  acceptZero?: boolean;
  alignment?: 'left' | 'center';
  max?: number;
  min?: number;
  name: string;
  onChange: (name: string, value: number) => void;
  step?: number;
  value?: number;
  children: React.ReactNode;
};

const Incrementer = ({
  acceptZero = true,
  alignment = 'left',
  children,
  max = 999999,
  min = -999999,
  name,
  onChange,
  step = 1,
  value = 0,
}: IncrementerProps) => {
  const handleDecrement = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();

    const newValue = value - step;
    const roundedNewValue = Math.round(newValue * 10000) / 10000;

    if (roundedNewValue < min) {
      if (acceptZero && roundedNewValue === 0) {
        onChange(name, 0);
      }

      return;
    }

    if (roundedNewValue > max) {
      onChange(name, max);

      return;
    }

    onChange(name, roundedNewValue);
  };

  const handleIncrement = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();

    const newValue = value + step;
    const roundedNewValue = Math.round(newValue * 10000) / 10000;

    if (roundedNewValue < min) {
      onChange(name, min);

      return;
    }

    if (roundedNewValue > max) return;

    onChange(name, roundedNewValue);
  };

  return (
    <Flex alignment={alignment}>
      <FlexChild>
        <StyledIconButton onClick={handleDecrement}>
          <Icon
            name="minus"
            fill="currentColor"
            className="cc__number-incrementer-icon"
          />
        </StyledIconButton>
      </FlexChild>
      <FlexChild>
        <PaddedDiv>{children}</PaddedDiv>
      </FlexChild>
      <FlexChild>
        <StyledIconButton onClick={handleIncrement}>
          <Icon
            name="plus"
            fill="currentColor"
            className="cc__number-incrementer-icon"
          />
        </StyledIconButton>
      </FlexChild>
    </Flex>
  );
};

export default Incrementer;
