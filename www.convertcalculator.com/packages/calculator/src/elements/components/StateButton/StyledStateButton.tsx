import styled, { css } from 'styled-components';

import StyledButton from '../../../components/StyledButton';
import { colors } from '../../../styles';
import { getBorderCSS } from '../../../styles/utils/getBorderCSS';
import { getBorderRadiusCSS } from '../../../styles/utils/getBorderRadiusCSS';
import { getSpacingCSS } from '../../../styles/utils/getSpacingCSS';

export const StyledStateButton = styled(StyledButton)<{
  checked: boolean;
  alignment: 'left' | 'center' | 'right' | 'full';
}>`
  ${({ theme, checked, alignment }) => {
    return css`
      width: ${alignment === 'full' ? '100%' : 'auto'};

      background-color: ${checked
        ? theme.stateButtonActiveBackgroundColor || colors['gray-300']
        : theme.stateButtonBackgroundColor ||
          theme.buttonBackgroundColor ||
          theme.primaryColor ||
          colors['gray-700']};
      color: ${checked
        ? theme.stateButtonActiveTextColor || colors['gray-700']
        : theme.stateButtonTextColor};

      ${getSpacingCSS(theme.stateButtonPadding)}

      ${checked
        ? getBorderCSS(theme.stateButtonActiveBorder)
        : getBorderCSS(theme.stateButtonBorder)}

      ${checked
        ? getBorderRadiusCSS(theme.stateButtonActiveBorderRadius)
        : getBorderRadiusCSS(theme.stateButtonBorderRadius)}

      &:hover {
        background-color: ${theme.stateButtonHoverBackgroundColor};
        color: ${theme.stateButtonHoverTextColor};
        ${getBorderCSS(theme.stateButtonHoverBorder)}
        ${getBorderRadiusCSS(theme.stateButtonHoverBorderRadius)}
      }
    `;
  }}

  ${({ isEditing }) => {
    return `
    pointer-events: ${isEditing ? 'none' : 'inherit'};
  `;
  }}
`;
