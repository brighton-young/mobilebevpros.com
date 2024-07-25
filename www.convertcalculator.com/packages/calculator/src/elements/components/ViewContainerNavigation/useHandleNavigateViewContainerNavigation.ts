import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useSelectedIndexOfViewContainer } from '../../../CalculatorState';
import navigableViewState from '../../../recoil/navigableViewState';
import selectedIndexOfViewContainerState from '../../../recoil/selectedIndexOfViewContainerState';
import showErrorsState from '../../../recoil/showErrorsState';
import useValidateViewContainerView from '../../../util/useValidateViewContainerView';

type Props = {
  viewContainerId: string;
};

const useHandleNavigateViewContainerNavigation = ({
  viewContainerId,
}: Props) => {
  const setSelectedViewIndex = useSetRecoilState(
    selectedIndexOfViewContainerState(viewContainerId),
  );

  const selectedViewIndex = useSelectedIndexOfViewContainer(viewContainerId);
  const setShowErrors = useSetRecoilState(showErrorsState);
  const navigableViews = useRecoilValue(navigableViewState(viewContainerId));

  const validateViewContainerView = useValidateViewContainerView();

  const handleNavigateView = (newViewIndex: number) => {
    setShowErrors(false);
    if (selectedViewIndex === newViewIndex) return;

    // navigate back is always allowed
    if (newViewIndex < selectedViewIndex) {
      setSelectedViewIndex(newViewIndex);

      window.dispatchEvent(
        new CustomEvent('navigateToView', {
          detail: {
            viewIndex: newViewIndex,
          },
        }),
      );

      return;
    }

    [...Array(newViewIndex - selectedViewIndex)]
      .reduce((acc, item, index) => {
        return acc.then(() => {
          return new Promise<void>((resolve, reject) => {
            const isValid = validateViewContainerView({
              itemId: navigableViews[selectedViewIndex + index].itemId,
            });

            if (isValid) {
              setSelectedViewIndex(selectedViewIndex + index + 1);

              window.dispatchEvent(
                new CustomEvent('navigateToView', {
                  detail: {
                    viewIndex: selectedViewIndex + index + 1,
                  },
                }),
              );
              resolve();
            } else {
              reject();
            }
          });
        });
      }, Promise.resolve())
      .catch(() => {
        setShowErrors(true);
      });
  };

  return handleNavigateView;
};

export default useHandleNavigateViewContainerNavigation;
