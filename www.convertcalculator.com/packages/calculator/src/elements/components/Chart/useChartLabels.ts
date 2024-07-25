import { useOutputByFormulaId } from '../../../CalculatorState';

export const useChartLabels = (element: any) => {
  const {
    formulaLabelColumnIndex,
    formulaColorColumnIndex,
    shouldUseFormulaForLabels,
    labels,
  } = element.chart;
  const output = useOutputByFormulaId(element.chart.labelsFormulaId);

  if (!shouldUseFormulaForLabels)
    return labels.filter((label) => {
      return (
        label.label !== undefined && label.label !== null && label.label !== ''
      );
    }); // filter out labels that have no label

  if (!Array.isArray(output?.result)) return [];

  return output.result
    .map((row) => {
      if (!Array.isArray(row)) {
        return {
          _id: row,
          label: row,
        };
      }

      return {
        _id: row,
        label: row[formulaLabelColumnIndex || 0],
        color: row[formulaColorColumnIndex],
      };
    })
    .filter((label) => {
      return (
        label.label !== undefined && label.label !== null && label.label !== ''
      );
    }); // filter out labels that have no label
};
