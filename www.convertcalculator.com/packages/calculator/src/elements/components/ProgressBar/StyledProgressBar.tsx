import styled from 'styled-components';

import { colors } from '../../../styles';
import { getBorderRadiusCSS } from '../../../styles/utils/getBorderRadiusCSS';
import { getSizeWithUnitCSS } from '../../../styles/utils/getSizeWithUnitCSS';

const StyledProgressBar = styled.div<{
  value: number;
  max: number;
}>`
  ${({ theme, value, max }) => {
    const valueColor =
      theme.progressBarActiveTrackColor ||
      theme.primaryColor ||
      colors['gray-500'];
    const width = (value / max) * 100;
    return `
      transition: width 0.5s ease-in-out;
      background: ${valueColor};
      width: ${width}%;
      height: 100%;
      ${getBorderRadiusCSS(theme.progressBarBorderRadius)}
    `;
  }}
`;

export default StyledProgressBar;
