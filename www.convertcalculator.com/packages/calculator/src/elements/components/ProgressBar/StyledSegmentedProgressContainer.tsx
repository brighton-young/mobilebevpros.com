import styled from 'styled-components';

import { getBorderRadiusCSS } from '../../../styles/utils/getBorderRadiusCSS';
import { getSizeWithUnitCSS } from '../../../styles/utils/getSizeWithUnitCSS';

const StyledSegmentedProgressContainer = styled.div<{ gap: number }>`
  ${({ theme, gap }) => {
    return `
      display: flex;
      gap: ${getSizeWithUnitCSS({ size: gap, unit: 'px' })}};
      width: 100%;
      height: ${getSizeWithUnitCSS(theme.progressBarHeight) || '10px'};
      ${getBorderRadiusCSS(theme.progressBarBorderRadius)}
      overflow: hidden;
    `;
  }}
`;

export default StyledSegmentedProgressContainer;
