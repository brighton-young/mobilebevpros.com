import styled from 'styled-components';

import { colors } from '../../../styles';
import { getBorderRadiusCSS } from '../../../styles/utils/getBorderRadiusCSS';
import { getSizeWithUnitCSS } from '../../../styles/utils/getSizeWithUnitCSS';

const StyledSegmentedProgressBarSegment = styled.div<{
  active: boolean;
}>`
  ${({ theme, active }) => {
    const inactiveColor =
      theme.progressBarTrackColor || theme.neutralColor || colors['gray-700'];

    const activeColor =
      theme.progressBarActiveTrackColor ||
      theme.primaryColor ||
      colors['gray-500'];

    const color = active ? activeColor : inactiveColor;

    return `
      background-color: ${color};
      flex-grow: 1;
    `;
  }}
`;

export default StyledSegmentedProgressBarSegment;
