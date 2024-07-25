import { useRecoilValue } from 'recoil';

import { useOutputs as useAllOutputs } from '../../../CalculatorState';
import calculatorState from '../../../recoil/calculatorState';

export const useChartDatasets = (datasets: any) => {
  const calculator = useRecoilValue(calculatorState);
  // @ts-ignore
  const { variables = [] } = calculator.contents;

  const outputs = useAllOutputs();

  return datasets
    .map((dataset) => {
      const formula = variables.find((_formula) => {
        return _formula._id === dataset.values;
      });
      const output = formula?.reference
        ? outputs[formula.reference]
        : undefined;

      const result = output?.result || [];

      return {
        ...dataset,
        ...formula,
        ...output,
        result: Array.isArray(result) ? result : [result],
      };
    })
    .filter((formula) => {
      return formula.error === null;
    }); // filter out formulas that have errors
};
