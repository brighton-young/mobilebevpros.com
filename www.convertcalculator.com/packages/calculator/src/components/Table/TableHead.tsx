import styled from 'styled-components';

import { colors, textSizes } from '../../styles';

const TableHead = styled.thead`
  background-color: ${colors['gray-100']};
  color: ${colors['gray-600']};
  text-transform: uppercase;
  font-weight: 500;
  font-size: ${textSizes.sm};
  border-bottom: 1px solid ${colors['gray-300']};
`;

export default TableHead;
