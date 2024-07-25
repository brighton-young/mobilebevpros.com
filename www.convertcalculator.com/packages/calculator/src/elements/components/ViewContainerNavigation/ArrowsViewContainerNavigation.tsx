import React from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  useIsUploading,
  useSelectedIndexOfViewContainer,
} from '../../../CalculatorState';
import Icon from '../../../components/Icon';
import navigableViewState from '../../../recoil/navigableViewState';
import selectedIndexOfViewContainerState from '../../../recoil/selectedIndexOfViewContainerState';
import showErrorsState from '../../../recoil/showErrorsState';
import useValidateViewContainerView from '../../../util/useValidateViewContainerView';

import StyledArrowButton from './StyledArrowButton';

interface Props {
  allowUserNavigation: boolean;
  viewContainerId: string;
  // the ArrowsWithCounterViewContainerNavigation component passes this prop so the counter is displayed between the arrows
  counterChildren?: React.ReactNode;
}

const ArrowsViewContainerNavigation = ({
  allowUserNavigation,
  viewContainerId,
  counterChildren,
}: Props) => {
  const setSelectedViewIndex = useSetRecoilState(
    selectedIndexOfViewContainerState(viewContainerId),
  );

  const selectedViewIndex = useSelectedIndexOfViewContainer(viewContainerId);
  const isUploading = useIsUploading();
  const setShowErrors = useSetRecoilState(showErrorsState);
  const navigableViews = useRecoilValue(navigableViewState(viewContainerId));

  const validateViewContainerView = useValidateViewContainerView();

  if (!allowUserNavigation) {
    return null;
  }

  const handlePreviousView = () => {
    if (selectedViewIndex <= 0) return;
    setSelectedViewIndex(selectedViewIndex - 1);

    window.dispatchEvent(
      new CustomEvent('navigateToView', {
        detail: {
          viewIndex: selectedViewIndex - 1,
        },
      }),
    );
  };

  const handleNextView = () => {
    if (!navigableViews[selectedViewIndex]) return;
    const isValid = validateViewContainerView({
      itemId: navigableViews[selectedViewIndex].itemId,
    });

    if (!isValid) {
      setShowErrors(true);
      return;
    }

    setShowErrors(false);

    if (!navigableViews[selectedViewIndex + 1]) return;

    setSelectedViewIndex(selectedViewIndex + 1);

    window.dispatchEvent(
      new CustomEvent('navigateToView', {
        detail: {
          viewIndex: selectedViewIndex + 1,
        },
      }),
    );
  };

  const isFirstView = selectedViewIndex === 0;
  const isLastView = selectedViewIndex === navigableViews.length - 1;

  return (
    <div className="cc__view-navigation cc__view-navigation-arrows">
      <StyledArrowButton
        className="cc__view-navigation-arrow cc__view-navigation-arrow-previous"
        isLeft
        type="button"
        onClick={handlePreviousView}
        disabled={isFirstView || isUploading}
      >
        <Icon name="chevronLeft" size={28} />
      </StyledArrowButton>
      {counterChildren}
      <StyledArrowButton
        className="cc__view-navigation-arrow cc__view-navigation-arrow-next"
        isRight
        type="button"
        onClick={handleNextView}
        disabled={isLastView || isUploading}
      >
        <Icon name="chevronRight" size={28} />
      </StyledArrowButton>
    </div>
  );
};

export default ArrowsViewContainerNavigation;
