import styled from 'styled-components';

import { colors } from '../../styles';

const TableRow = styled.tr`
  border-bottom: 1px solid ${colors['gray-300']};

  &:last-child {
    border-bottom: none;
  }
`;

export default TableRow;
