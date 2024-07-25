import { useRecoilCallback } from 'recoil';

import formulaItemState from '../../recoil/formulaItemState';
import navigableViewState from '../../recoil/navigableViewState';
import selectedIndexOfViewContainerState from '../../recoil/selectedIndexOfViewContainerState';
import showErrorsState from '../../recoil/showErrorsState';
import useValidateViewContainerView from '../../util/useValidateViewContainerView';
import validateViewContainerView from '../../util/validateViewContainerView';

export type ViewNavigationAction = {
  type: 'viewContainerNavigation';
  viewContainerNavigation:
    | {
        viewContainerId: string;
        navigationCommand: 'NEXT';
      }
    | {
        viewContainerId: string;
        navigationCommand: 'PREVIOUS';
      }
    | {
        viewContainerId: string;
        navigationCommand: 'INDEX';
        formula: string;
      };
};

type UseViewNavigationAction = () => (
  action: ViewNavigationAction,
) => Promise<void>;

export const useViewNavigationAction: UseViewNavigationAction = () => {
  const validateViewContainerViewCallback = useValidateViewContainerView();

  return useRecoilCallback(({ snapshot, set }) => {
    return async (action) => {
      const { viewContainerNavigation } = action;
      const { navigationCommand, viewContainerId } = viewContainerNavigation;

      if (!viewContainerId) {
        return;
      }

      const selectedViewIndex = snapshot.getLoadable(
        selectedIndexOfViewContainerState(viewContainerId),
      ).contents;

      const navigableViews = snapshot.getLoadable(
        navigableViewState(viewContainerId),
      ).contents;

      switch (navigationCommand) {
        case 'NEXT': {
          if (selectedViewIndex === navigableViews.length - 1) {
            return;
          }

          const isValid = validateViewContainerViewCallback({
            itemId: navigableViews[selectedViewIndex].itemId,
          });

          if (!isValid) {
            set(showErrorsState, true);
            return;
          }

          set(showErrorsState, false);

          set(
            selectedIndexOfViewContainerState(viewContainerId),
            selectedViewIndex + 1,
          );

          return;
        }
        case 'PREVIOUS': {
          if (selectedViewIndex === 0) {
            return;
          }

          set(
            selectedIndexOfViewContainerState(viewContainerId),
            selectedViewIndex - 1,
          );

          return;
        }
        case 'INDEX': {
          const { formula } = viewContainerNavigation;

          set(showErrorsState, false);

          if (!formula) {
            return;
          }

          const formulaOutput = await snapshot.getPromise(
            formulaItemState(`${viewContainerId}-INDEX-${formula}`),
          );

          if (
            !formulaOutput ||
            formulaOutput?.error ||
            typeof formulaOutput?.result !== 'number'
          ) {
            console.error(
              `error evaluating formula for view container ${viewContainerId}`,
            );
            return;
          }

          const newView = formulaOutput?.result;

          if (!newView) return;

          // users see 1-based indexes, but we use 0-based indexes
          // so navigate to view 1 for users means we need to navigate to index 0
          const newViewIndex = newView - 1;

          if (selectedViewIndex === newViewIndex) return;

          // navigate back is always allowed
          if (newViewIndex < selectedViewIndex) {
            set(
              selectedIndexOfViewContainerState(viewContainerId),
              newViewIndex,
            );
          }

          if (newViewIndex - selectedViewIndex < 1) {
            return;
          }

          [...Array(newViewIndex - selectedViewIndex)]
            .reduce((acc, item, index) => {
              return acc.then(() => {
                return new Promise<void>((resolve, reject) => {
                  const isValid = validateViewContainerView(
                    snapshot,
                    navigableViews[selectedViewIndex + index].itemId,
                  );

                  if (isValid) {
                    set(
                      selectedIndexOfViewContainerState(viewContainerId),
                      selectedViewIndex + index + 1,
                    );
                    resolve();
                  } else {
                    reject();
                  }
                });
              });
            }, Promise.resolve())
            .catch(() => {
              set(showErrorsState, true);
            });

          return;
        }
        default: {
          const unreachable: never = navigationCommand;
          throw new Error(`unknown navigation command: ${unreachable}`);
        }
      }
    };
  });
};
