import { SizeWithUnit } from '../inputType';

export const getSizeWithUnitCSS = (value?: SizeWithUnit) => {
  if (value?.size) {
    return `${value.size}${value.unit}`;
  }
  return '';
};
