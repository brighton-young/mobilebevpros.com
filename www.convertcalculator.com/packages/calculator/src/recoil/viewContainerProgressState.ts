import { selectorFamily } from 'recoil';

import findNestedItem from '../util/findNestedItem';

import calculatorState from './calculatorState';
import formulaSelectedItemsState from './formulaSelectedItemsState';
import selectedIndexOfViewContainerState from './selectedIndexOfViewContainerState';

const navigableViewState = selectorFamily<
  {
    value: number;
    max: number;
  },
  string
>({
  key: 'viewContainerProgressState',
  get: (viewContainerId) => {
    return ({ get }) => {
      const calculatorContents = get(calculatorState);

      const viewContainerElement = findNestedItem({
        items: calculatorContents.items,
        itemId: viewContainerId,
      });

      if (!viewContainerElement) {
        return {
          value: 0,
          max: 0,
        };
      }

      const viewItems = viewContainerElement.children.filter((item) => {
        return item.type === 'view';
      });

      const viewElements = viewItems.map((element) => {
        return calculatorContents.contents.elements.find((item) => {
          return item._id === element.itemId;
        });
      });

      const viewElementsVisibilityOutputs = get(
        formulaSelectedItemsState(
          viewElements.map((item) => {
            return `${item.reference}-VE`;
          }),
        ),
      );

      const viewStatusList: {
        viewId: string;
        visibility: boolean;
      }[] = viewItems.map((element, index) => {
        return {
          viewId: element.itemId,
          visibility: viewElementsVisibilityOutputs[index]?.result,
        };
      });

      const selectedIndexOfViewContainer = get(
        selectedIndexOfViewContainerState(viewContainerId),
      );

      const selectedViewItemId = viewStatusList.filter((item) => {
        return item.visibility === undefined || item.visibility;
      })[selectedIndexOfViewContainer]?.viewId;

      const value = viewStatusList.findIndex((item) => {
        return item.viewId === selectedViewItemId;
      });

      return {
        value: value + 1,
        max: viewStatusList.length,
      };
    };
  },
});

export default navigableViewState;
