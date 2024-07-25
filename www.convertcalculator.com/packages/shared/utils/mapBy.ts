/**
 * Creates a `new Map` from an array of objects, keyed by the given key
 *
 * @param list The array of objects to map
 * @param key The key to use for the map
 *
 * @example
 * const list = [
 *  { id: 1, name: 'foo' },
 *  { id: 2, name: 'bar' },
 *  { id: 3, name: 'baz' },
 * ];
 *
 * const map = mapBy(list, 'id');
 */
const mapBy = <
  T extends Record<string | number | symbol, any>,
  K extends keyof T,
>(
  list: T[],
  key: K,
): Map<T[K], T> => {
  const map = new Map<T[K], T>();

  list.forEach((item) => {
    map.set(item[key], item);
  });

  return map;
};

export default mapBy;
