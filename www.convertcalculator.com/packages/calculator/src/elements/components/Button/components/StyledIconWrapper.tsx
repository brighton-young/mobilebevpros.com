import styled from 'styled-components';

import { getSizeWithUnitCSS } from '../../../../styles/utils/getSizeWithUnitCSS';

const StyledIconWrapper = styled.span`
  line-height: 1 !important;

  ${({ theme }) => {
    return `
      font-size: ${
        getSizeWithUnitCSS(theme.buttonFontSize) || 'inherit'
      } !important;
    `;
  }};
`;

export default StyledIconWrapper;
