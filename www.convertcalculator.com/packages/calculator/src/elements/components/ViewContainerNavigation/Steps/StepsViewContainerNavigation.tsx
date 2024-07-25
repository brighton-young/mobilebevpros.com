import React from 'react';

import { useRecoilValue } from 'recoil';

import {
  useIsUploading,
  useSelectedIndexOfViewContainer,
} from '../../../../CalculatorState';
import navigableViewState from '../../../../recoil/navigableViewState';
import useHandleNavigateViewContainerNavigation from '../useHandleNavigateViewContainerNavigation';

import CheckIcon from './CheckIcon';
import { StyledStep } from './StyledStep';
import { StyledStepBubble, StyledStepDot } from './StyledStepBubble';
import { StyledStepContentWrapper } from './StyledStepContentWrapper';
import { StyledStepLabel } from './StyledStepLabel';
import { StyledSteps } from './StyledSteps';

interface Props {
  allowUserNavigation: boolean;
  viewContainerId: string;

  stepsShowTitles: boolean;
  stepsShowNumbers: boolean;
}

const StepsViewContainerNavigation = ({
  allowUserNavigation,
  viewContainerId,
  stepsShowNumbers,
  stepsShowTitles,
}: Props) => {
  const selectedViewIndex = useSelectedIndexOfViewContainer(viewContainerId);
  const isUploading = useIsUploading();

  const navigableViews = useRecoilValue(navigableViewState(viewContainerId));

  const handleNavigateView = useHandleNavigateViewContainerNavigation({
    viewContainerId,
  });

  return (
    <StyledSteps className="cc__view-navigation cc__view-navigation-steps">
      {navigableViews.map((view, index) => {
        const isActive = selectedViewIndex === index;
        const isCompleted = index < selectedViewIndex;

        const disabled = !allowUserNavigation || isUploading;

        return (
          <StyledStep
            className={`cc__view-navigation-item ${
              isActive ? 'is-selected' : ''
            }`}
            // eslint-disable-next-line react/no-array-index-key
            key={view.itemId}
            isActive={isActive}
            stepsShowNumbers={stepsShowNumbers}
            disabled={disabled}
            isCompleted={isCompleted}
            onClick={() => {
              if (disabled) return;

              handleNavigateView(index);
            }}
          >
            <StyledStepContentWrapper>
              <StyledStepBubble
                isActive={isActive}
                isCompleted={isCompleted}
                disabled={disabled}
              >
                {stepsShowNumbers && index + 1}
                {!stepsShowNumbers && (
                  <>
                    {isCompleted && (
                      <div>
                        <CheckIcon size={18} />
                      </div>
                    )}
                    {Boolean(!isCompleted && isActive) && <StyledStepDot />}
                  </>
                )}
              </StyledStepBubble>
              {stepsShowTitles && (
                <StyledStepLabel className="cc__view-navigation-step-label">
                  {view.viewTitle}
                </StyledStepLabel>
              )}
            </StyledStepContentWrapper>
          </StyledStep>
        );
      })}
    </StyledSteps>
  );
};

export default StepsViewContainerNavigation;
