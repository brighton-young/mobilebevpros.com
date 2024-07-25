import React from 'react';

import classNames from 'classnames';
import { useRecoilValue } from 'recoil';

import {
  useIsUploading,
  useSelectedIndexOfViewContainer,
} from '../../../CalculatorState';
import navigableViewState from '../../../recoil/navigableViewState';

import { StyledDotsLink } from './StyledDotsLink';
import { StyledDotsList } from './StyledDotsList';
import useHandleNavigateViewContainerNavigation from './useHandleNavigateViewContainerNavigation';

interface Props {
  allowUserNavigation: boolean;
  viewContainerId: string;
  isNumbered?: boolean;
}

const DotsViewContainerNavigation = ({
  allowUserNavigation,
  viewContainerId,
  isNumbered = false,
}: Props) => {
  const selectedViewIndex = useSelectedIndexOfViewContainer(viewContainerId);
  const isUploading = useIsUploading();

  const navigableViews = useRecoilValue(navigableViewState(viewContainerId));

  const handleNavigateView = useHandleNavigateViewContainerNavigation({
    viewContainerId,
  });

  return (
    <StyledDotsList
      className={classNames('cc__view-navigation', {
        'cc__view-navigation-dots': !isNumbered,
        'cc__view-navigation-numbered-dots': !isNumbered,
      })}
    >
      {navigableViews.map((view, index) => {
        const isActive = selectedViewIndex === index;

        return (
          <StyledDotsLink
            className={`cc__view-navigation-item ${
              isActive ? 'is-selected' : ''
            }`}
            // eslint-disable-next-line react/no-array-index-key
            key={view.itemId}
            isActive={isActive}
            isNumbered={isNumbered}
            disabled={!allowUserNavigation || isUploading}
            onClick={() => {
              if (!allowUserNavigation) return;
              if (isUploading) return;

              handleNavigateView(index);
            }}
          >
            {isNumbered && index + 1}
          </StyledDotsLink>
        );
      })}
    </StyledDotsList>
  );
};

export default DotsViewContainerNavigation;
