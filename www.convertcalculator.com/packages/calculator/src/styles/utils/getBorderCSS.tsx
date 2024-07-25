import { Border } from '../inputType';

import { getSizeWithUnitCSS } from './getSizeWithUnitCSS';

export const getBorderCSS = (value?: Border) => {
  if (!value) return '';

  return `
    border-style: ${value?.style || ''};
    border-width: ${getSizeWithUnitCSS(value?.width)};
    border-color: ${value?.color || ''};
    `;
};
