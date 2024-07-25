import { Item } from '../types';

import { findAncestors } from './findAncestors';

const findParentViewContainer = ({
  items = [],
  itemId,
}: {
  items: Item[];
  itemId: string;
}) => {
  const ancestors = findAncestors(items, itemId);

  if (!ancestors) return null;

  // to find the deepest nested view container, reverse the ancestors and search for the first view container
  return ancestors.reverse().find((item) => {
    return item.type === 'viewContainer';
  });
};

export default findParentViewContainer;
