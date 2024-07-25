import React from 'react';

import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { useSelectedIndexOfViewContainer } from '../../../CalculatorState';
import navigableViewState from '../../../recoil/navigableViewState';

const StyledCounter = styled.div``;

interface Props {
  allowUserNavigation: boolean;
  viewContainerId: string;
}

const CounterViewContainerNavigation = ({ viewContainerId }: Props) => {
  const selectedViewIndex = useSelectedIndexOfViewContainer(viewContainerId);
  const navigableViews = useRecoilValue(navigableViewState(viewContainerId));

  return (
    <StyledCounter>
      {selectedViewIndex + 1}/{navigableViews.length}
    </StyledCounter>
  );
};

export default CounterViewContainerNavigation;
