import { CalculatorContent } from '../types';

import getTreeOld from './getTree';

/**
 * This getTree function is a temporary function to map data from database to how we
 * want the structure to be in the calculator. At some point we want to have the DB structure
 * on par with the output of this structure.
 */

const getTree = (calculator?: CalculatorContent) => {
  const itemsWithViews = getTreeOld(calculator.items);
  const elements = [
    ...calculator.contents.elements,
    ...calculator.contents.formulas,
    ...calculator.contents.questions,
  ];

  return itemsWithViews.map((itemsInView) => {
    return addElementRec(itemsInView, elements);
  });
};

const addElementRec = (items = [], elements = []) => {
  const newItems = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const element = elements.find((e) => {
      return e._id === item.itemId;
    });

    // this is to combat ghost elements
    // ghost elements are in `items` but not in `contents`. This is an editor bug.
    if (element) {
      let children = [];
      if (item.children) {
        children = addElementRec(item.children, elements);
      }

      newItems.push({
        ...item,
        ...element,
        children,
      });
    }
  }

  return newItems;
};

export default getTree;
