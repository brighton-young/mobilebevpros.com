import styled from 'styled-components';

import { colors } from '../../../styles';
import { getBorderRadiusCSS } from '../../../styles/utils/getBorderRadiusCSS';
import { getSizeWithUnitCSS } from '../../../styles/utils/getSizeWithUnitCSS';

// I tried using the progress html element but failed to get the styling consistent across browsers
// Therefor it's made up of just a div with a background color and a child div with a different background color

const StyledProgressContainer = styled.div`
  ${({ theme }) => {
    const backgroundColor =
      theme.progressBarTrackColor || theme.neutralColor || colors['gray-700'];
    return `
      background: ${backgroundColor};
      width: 100%;
      height: ${getSizeWithUnitCSS(theme.progressBarHeight) || '10px'};
      ${getBorderRadiusCSS(theme.progressBarBorderRadius)}
    `;
  }}
`;

export default StyledProgressContainer;
