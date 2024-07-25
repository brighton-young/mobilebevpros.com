import React from 'react';

import styled, { css } from 'styled-components';

import { colors } from '../../../styles';

import ArrowsViewContainerNavigation from './ArrowsViewContainerNavigation';
import CounterViewContainerNavigation from './CounterViewContainerNavigation';
import { getReadableColor } from './StyledArrowButton';

const StyledContainer = styled.div`
  & > div {
    display: flex;
  }
`;

const StyledCounterContainer = styled.div`
  min-width: 40px;
  text-align: center;
  margin-left: -1px; // a hack to hide the right border of the left arrow

  font-size: 14px;
  padding-top: 2px;

  ${({ theme }) => {
    const backgroundColor =
      theme.backgroundColor || theme.primaryColor || colors['gray-700'];

    const textColor = getReadableColor({ color: backgroundColor });

    return css`
      background-color: ${backgroundColor};
      color: ${textColor};
    `;
  }};
`;

interface Props {
  allowUserNavigation: boolean;
  viewContainerId: string;
}

const ArrowsWithCounterViewContainerNavigation = (props: Props) => {
  return (
    <StyledContainer>
      <ArrowsViewContainerNavigation
        {...props}
        counterChildren={
          <StyledCounterContainer>
            <CounterViewContainerNavigation {...props} />
          </StyledCounterContainer>
        }
      />
    </StyledContainer>
  );
};

export default ArrowsWithCounterViewContainerNavigation;
