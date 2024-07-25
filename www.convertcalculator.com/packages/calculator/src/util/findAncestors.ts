import { Item } from '../types';

export const findAncestors = (
  items: Item[],
  itemId: string,
  ancestors = [],
): Item[] => {
  for (let i = 0; i < items.length; i++) {
    const element = items[i];

    const currentPath = [...ancestors, element];

    if (element.itemId === itemId) {
      return ancestors; // Return the path leading to the found item
    }
    if (element.children?.length > 0) {
      const ancestorResult = findAncestors(
        element.children,
        itemId,
        currentPath,
      );
      if (ancestorResult) {
        return ancestorResult; // Return the path if found in the descendants
      }
    }
  }
  return null; // Return null if the itemId is not found in the data
};
