import { selectorFamily } from 'recoil';

import calculatorItemState from './calculatorItemState';
import formulaItemState from './formulaItemState';

const tableResultState = selectorFamily({
  key: 'tableResultState',
  default: [],
  get: (formulaId) => {
    return ({ get }) => {
      const formula = get(calculatorItemState(formulaId));

      const { columns: tableColumns, data: tableData } = formula.table.table;

      return tableData.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          const column = tableColumns[cellIndex];

          if (!column) return undefined;

          if (column.type !== 'equation') return cell;

          return get(
            formulaItemState(`${formula.reference}-${rowIndex}-${cellIndex}`),
          )?.result;
        });
      });
    };
  },
});

export default tableResultState;
