import React from 'react';

import styled, { css } from 'styled-components';

import FormulaResultTypesEnum from '@cc/shared/enums/formula-result-types';

import { getFormulaResultStyleVariables } from '../styles/styleVariables/formulaResultStyleVariables';
import useStyles from '../styles/useStyles';
import { formatDate } from '../util/formatDate';
import getFormattedNumber from '../util/getFormattedNumber';
import getFormulaResultType from '../util/getFormulaResultType';

import Table, { TableData, TableRow } from './Table';

type StyledDivProps = {
  styles: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    textColor: string;
    textAlign: string;
    textTransform: string;
    fontStyle: string;
  };
};

const StyledDiv = styled.div<StyledDivProps>`
  ${({ styles }) => {
    return css`
      font-family: ${styles.fontFamily};
      font-size: ${styles.fontSize};
      font-weight: ${styles.fontWeight};
      line-height: ${styles.lineHeight};
      color: ${styles.textColor};
      text-align: ${styles.textAlign};
      text-transform: ${styles.textTransform};
      font-style: ${styles.fontStyle};
    `;
  }}
`;

type FormulaResultProps = {
  numberFormatting: string;
  decimals: number;
  elementStyle?: {
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    textColor?: string;
    textAlign?: string;
    textTransform?: string;
    fontStyle?: string;
  };
  language: string;
  prefix: string;
  postfix: string;
  result: string | number | boolean | Date | string[];
};

const FormulaResult: React.FC<FormulaResultProps> = ({
  numberFormatting,
  decimals,
  elementStyle = {},
  language,
  prefix,
  postfix,
  result,
}) => {
  const resultType = getFormulaResultType(result);
  const formattedResult = getFormattedNumber(
    numberFormatting,
    result,
    decimals,
  );

  const styles = useStyles({
    prefix: 'formulaResult',
    elementStyle,
    getVariables: getFormulaResultStyleVariables,
  });

  return (
    <>
      {resultType === FormulaResultTypesEnum.BOOLEAN && (
        <StyledDiv styles={styles}>{result ? 'Yes' : 'No'}</StyledDiv>
      )}

      {resultType === FormulaResultTypesEnum.DATE && (
        <span className="cc__formula-result-date">
          {formatDate(result, 'D MMMM YYYY', language)}
        </span>
      )}

      {resultType === FormulaResultTypesEnum.EMPTY && (
        <StyledDiv styles={styles}>...</StyledDiv>
      )}

      {resultType === FormulaResultTypesEnum.IMAGE && (
        <img src={result} alt="" />
      )}

      {resultType === FormulaResultTypesEnum.LIST && (
        <Table>
          <tbody>
            <TableRow>
              {result.map((cell, i) => {
                return <TableData key={i}>{cell}</TableData>;
              })}
            </TableRow>
          </tbody>
        </Table>
      )}

      {resultType === FormulaResultTypesEnum.NUMBER && (
        <StyledDiv styles={styles}>
          <span className="cc__formula-result-prefix">{prefix}</span>
          <span className="cc__formula-result-value">{formattedResult}</span>
          <span className="cc__formula-result-suffix">{postfix}</span>
        </StyledDiv>
      )}

      {resultType === FormulaResultTypesEnum.TABLE && (
        <Table>
          <tbody>
            {result.map((row, rowIndex) => {
              if (!Array.isArray(row)) return undefined;
              return (
                <TableRow key={`row-${rowIndex}`}>
                  {row.map((cell, cellIndex) => {
                    return (
                      <TableData key={`row-${rowIndex}-cell-${cellIndex}`}>
                        {cell}
                      </TableData>
                    );
                  })}
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      )}

      {resultType === FormulaResultTypesEnum.TEXT && (
        <StyledDiv className="cc__formula-result-text" styles={styles}>
          {result}
        </StyledDiv>
      )}
    </>
  );
};

export default FormulaResult;
