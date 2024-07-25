import isArray from 'lodash/isArray';

import isNumberLike from '@cc/shared/utils/isNumberLike';
import parseNumber from '@cc/shared/utils/parseNumber';

import { useOutput } from '../../../CalculatorState';

export const useOptions = (question) => {
  const { reference, type } = question;

  const {
    shouldUseFormulaForOptions,
    optionsFormulaLabelColumnIndex,
    optionsFormulaValueColumnIndex,
    optionsFormulaImageColumnIndex,
    optionsFormulaTooltipTextColumnIndex,
    options: optionsFromSettings,
  } = question[type];

  const output = useOutput(`${reference}-RF`);

  if (!shouldUseFormulaForOptions) return optionsFromSettings;

  if (!isArray(output?.result)) return [];

  return output.result.map((row, index) => {
    if (!isArray(row)) {
      return {
        _id: row,
        label: row,
        value: index + 1,
      };
    }
    const newValue = isNumberLike(row[optionsFormulaValueColumnIndex])
      ? parseNumber(row[optionsFormulaValueColumnIndex])
      : index + 1;

    return {
      _id: `${reference}-RF-${row[optionsFormulaLabelColumnIndex || 0]}`,
      label: row[optionsFormulaLabelColumnIndex || 0],
      value: newValue,
      tooltipText: row[optionsFormulaTooltipTextColumnIndex],
      image: row[optionsFormulaImageColumnIndex],
    };
  });
};
