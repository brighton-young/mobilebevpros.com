import { useRecoilCallback } from 'recoil';

import { useFeatureFlags } from '../../../CalculatorState';
import calculatorState from '../../../recoil/calculatorState';
import { isUploadingState } from '../../../recoil/isUploadingState';
import isValidState from '../../../recoil/isValidState';
import navigableViewState from '../../../recoil/navigableViewState';
import selectedIndexOfViewContainerState from '../../../recoil/selectedIndexOfViewContainerState';
import selectedViewState from '../../../recoil/selectedViewState';
import showErrorsState from '../../../recoil/showErrorsState';
import viewCountState from '../../../recoil/viewCountState';
import findParentViewContainer from '../../../util/findParentViewContainer';
import validateViewContainerView from '../../../util/validateViewContainerView';

const HANDLE_JUMP_TO_NEXT_VIEW_DELAY = 350;

const jumpInViewContainer = ({ snapshot, set, parentViewContainer }) => {
  const viewContainerId = parentViewContainer.itemId;
  const currentViewIndex = snapshot.getLoadable(
    selectedIndexOfViewContainerState(viewContainerId),
  ).contents;
  const navigableViews = snapshot.getLoadable(
    navigableViewState(viewContainerId),
  ).contents;

  const isValid = validateViewContainerView(
    snapshot,
    navigableViews[currentViewIndex].itemId,
  );

  if (!isValid) {
    set(showErrorsState, true);
    return;
  }

  set(showErrorsState, false);

  if (navigableViews[currentViewIndex + 1]) {
    set(
      selectedIndexOfViewContainerState(viewContainerId),
      currentViewIndex + 1,
    );
  }
};

const useJumpToNextView = ({ hasLocalError = false, question }) => {
  const { shouldJumpToNextViewUponAnswer } = question;

  const { viewContainer: viewContainerFeatureFlag } = useFeatureFlags();
  const handleJumpToNextView = useRecoilCallback(
    ({ snapshot, set }) => {
      return () => {
        if (!shouldJumpToNextViewUponAnswer) return;

        const isUploading = snapshot.getLoadable(isUploadingState).contents;
        if (isUploading) return;

        if (viewContainerFeatureFlag) {
          // determine if this question is a child of a view container
          // or if it must control a view break jump
          const calculator = snapshot.getLoadable(calculatorState).contents;

          const parentViewContainer = findParentViewContainer({
            items: calculator.items,
            itemId: question._id,
          });
          if (parentViewContainer) {
            jumpInViewContainer({ snapshot, set, parentViewContainer });
            return;
          }
        }

        const isValid = snapshot.getLoadable(isValidState).contents;
        const viewCount = snapshot.getLoadable(viewCountState).contents;

        // if there is only one view, there is no need to jump
        if (viewCount < 2) return;

        if (isValid && !hasLocalError) {
          const selectedViewIndex =
            snapshot.getLoadable(selectedViewState).contents;
          const isLastView = selectedViewIndex === viewCount - 1;

          if (isLastView) return;

          set(selectedViewState, selectedViewIndex + 1);
        } else {
          set(showErrorsState, true);
        }
      };
    },
    [hasLocalError, shouldJumpToNextViewUponAnswer],
  );

  const handleJumpToNextViewAfterTimeout = () => {
    window.setTimeout(handleJumpToNextView, HANDLE_JUMP_TO_NEXT_VIEW_DELAY);
  };

  return { handleJumpToNextView: handleJumpToNextViewAfterTimeout };
};

export default useJumpToNextView;
