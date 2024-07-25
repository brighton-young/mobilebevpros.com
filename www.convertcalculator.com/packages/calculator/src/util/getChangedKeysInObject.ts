import { dequal } from 'dequal';
import isUndefined from 'lodash/isUndefined';

const getChangedKeysInObject = (
  oldObject = {},
  newObject = {},
  isDeep = true,
) => {
  return Object.entries(newObject)
    .filter(([key, value]) => {
      if (isUndefined(oldObject[key])) return true;
      if (isDeep && !dequal(value, oldObject[key])) return true;
      if (!isDeep && value !== oldObject[key]) return true;

      return false;
    })
    .map(([key]) => {
      return key;
    });
};

export default getChangedKeysInObject;
