import styled from 'styled-components';

import { colors } from '../../styles';

const StyledIconWrapper = styled.span`
  ${({ theme }) => {
    return `
        color: ${
          theme.fileIconColor || theme.fileTextColor || colors['gray-700']
        };
        `;
  }}
`;

export default StyledIconWrapper;
