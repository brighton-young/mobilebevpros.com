import styled from 'styled-components';

import { colors } from '../../styles';
import { getSizeWithUnitCSS } from '../../styles/utils/getSizeWithUnitCSS';
import { getSpacingCSS } from '../../styles/utils/getSpacingCSS';

const StyledFiles = styled.div`
  margin-bottom: 0rem !important;
  text-align: center;

  ${({ theme }) => {
    return `
      background-color: ${theme.fileBackgroundColor || colors['gray-100']};
      color: ${theme.fileTextColor || colors['gray-700']};
      font-size: ${
        getSizeWithUnitCSS(theme.fileFontSize) ||
        getSizeWithUnitCSS(theme.fontSize) ||
        'inherit'
      };
      font-weight: ${theme.fileFontWeight || '600'};
      
      ${getSpacingCSS(theme.filePadding)}
      
  `;
  }}
`;

export default StyledFiles;
