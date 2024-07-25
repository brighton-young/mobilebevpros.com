const findNestedItem = ({ items = [], itemId }) => {
  return items.reduce((acc, item) => {
    if (acc) return acc;

    if (item.itemId === itemId) return item;

    return findNestedItem({ items: item.children, itemId });
  }, undefined);
};

export default findNestedItem;
