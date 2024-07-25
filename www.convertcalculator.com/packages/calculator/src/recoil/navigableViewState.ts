import { selectorFamily } from 'recoil';

import findNestedItem from '../util/findNestedItem';

import calculatorState from './calculatorState';
import formulaSelectedItemsState from './formulaSelectedItemsState';

type NavigableView = {
  type: 'view';
  collection: 'elements';
  itemId: string;
  children: any[];
  viewTitle: string;
};

const navigableViewState = selectorFamily<NavigableView[], string>({
  key: 'navigableViewState',
  get: (viewContainerId) => {
    return ({ get }) => {
      const calculatorContents = get(calculatorState);

      const viewContainerElement = findNestedItem({
        items: calculatorContents.items,
        itemId: viewContainerId,
      });

      if (!viewContainerElement) {
        return [];
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

      return viewItems
        .filter((element, index) => {
          if (viewElementsVisibilityOutputs[index] === undefined) return true;
          return viewElementsVisibilityOutputs[index]?.result;
        })
        .map((element) => {
          const matchingViewElement = viewElements.find((item) => {
            return item._id === element.itemId;
          });
          return {
            ...element,
            viewTitle: matchingViewElement.view.viewTitle,
          };
        });
    };
  },
});

export default navigableViewState;
