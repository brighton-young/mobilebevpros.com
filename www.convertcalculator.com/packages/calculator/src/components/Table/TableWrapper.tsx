import styled from 'styled-components';

import { borderRadius, colors } from '../../styles';

const TableWrapper = styled.div`
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors['gray-300']};
  overflow: hidden;
`;

export default TableWrapper;
