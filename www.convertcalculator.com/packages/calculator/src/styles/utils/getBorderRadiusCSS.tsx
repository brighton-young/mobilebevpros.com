import { SizeWithUnit } from '../inputType';

import { getSizeWithUnitCSS } from './getSizeWithUnitCSS';

export const getBorderRadiusCSS = (value?: SizeWithUnit) => {
  if (!value) return '';

  return `
    border-radius: ${getSizeWithUnitCSS(value)};
    `;
};
