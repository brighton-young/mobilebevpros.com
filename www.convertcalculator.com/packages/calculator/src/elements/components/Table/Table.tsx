import { useRecoilValue } from 'recoil';

import { CalculatorSettings } from '@cc/types';

import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FormulaResult from '../../../components/FormulaResult';
import StyledTable, {
  TableData,
  TableHead,
  TableRow,
  TableWrapper,
} from '../../../components/Table';
import tableResultState from '../../../recoil/tableResultState';

type TableProps = {
  formula: TableElement;
  isHidden: boolean;
  settings: CalculatorSettings;
};

export type TableElement = {
  type: 'table';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  visibilityEquation: string;
  table: {
    shouldShowTableHeader?: boolean;
    table: {
      columns: {
        _id?: string;
        decimals?: number;
        name?: string;
        postfix?: string;
        prefix?: string;
        shouldHideIfZero?: boolean;
        type?: string;
        width?: number;
      }[];
      data: (string | undefined)[][];
    };
  };
};

const Table = ({ formula, isHidden, settings }: TableProps) => {
  const { table } = formula;
  const { language, numberFormatting } = settings;

  const { columns: tableColumns, data: tableData } = formula.table.table;

  const tableResults = useRecoilValue(tableResultState(formula._id));

  return (
    <ElementStyleWrapper
      collection="formulas"
      element={formula}
      isHidden={isHidden}
    >
      <ElementTitleWrapper collection="formulas" element={formula}>
        <ElementClassNameWrapper element={formula}>
          <TableWrapper>
            <StyledTable className="cc__table">
              {table.shouldShowTableHeader && (
                <TableHead className="cc__table-head">
                  <tr className="cc__table-head-row">
                    {tableColumns.map((column, columnIndex) => {
                      return (
                        <TableData
                          key={column._id ?? columnIndex}
                          width={column.width}
                          className={`cc__table-head-data cc__table-head-data-${columnIndex}`}
                        >
                          {column.name}
                        </TableData>
                      );
                    })}
                  </tr>
                </TableHead>
              )}
              <tbody className="cc__table-body">
                {tableData.map((row, rowIndex) => {
                  const isRowHidden = row.reduce((acc, _, cellIndex) => {
                    const column = tableColumns[cellIndex];
                    const result = tableResults[rowIndex][cellIndex];

                    if (
                      column &&
                      column.type === 'equation' &&
                      column.shouldHideIfZero &&
                      !result
                    ) {
                      return true;
                    }

                    return acc;
                  }, false);

                  if (isRowHidden) return false;

                  return (
                    <TableRow
                      key={`${formula._id}-row-${rowIndex}`}
                      className={`cc__table-row cc__table-row-${rowIndex}`}
                    >
                      {row.map((cellValue, cellIndex) => {
                        const result = tableResults[rowIndex][cellIndex];
                        const column = tableColumns[cellIndex];

                        if (!column) return false;

                        const { decimals, prefix, postfix, type, width } =
                          column;

                        if (type !== 'equation') {
                          return (
                            <TableData
                              key={`${formula._id}-row-data-${cellIndex}`}
                              width={width}
                            >
                              {cellValue}
                            </TableData>
                          );
                        }

                        return (
                          <TableData
                            key={`${formula._id}-row-${rowIndex}-cell-${cellIndex}`}
                            width={width}
                            className={`cc__table-data cc__table-data-${cellIndex}`}
                          >
                            <FormulaResult
                              decimals={decimals}
                              language={language}
                              numberFormatting={numberFormatting}
                              prefix={prefix}
                              postfix={postfix}
                              result={result}
                            />
                          </TableData>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </tbody>
            </StyledTable>
          </TableWrapper>
        </ElementClassNameWrapper>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default Table;
