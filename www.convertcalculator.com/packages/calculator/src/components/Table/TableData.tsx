import styled from 'styled-components';

type TableDataProps = {
  width?: number;
};

const TableData = styled.td<TableDataProps>`
  padding: 0.5rem 0.5rem;
  ${({ width }) => {
    if (width) {
      return `
        width: ${width}%;
    `;
    }

    return '';
  }};
`;

export default TableData;
