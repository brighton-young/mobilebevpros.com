import styled from 'styled-components';

import { colors } from '../../styles';
import { getBorderCSS } from '../../styles/utils/getBorderCSS';
import { getBorderRadiusCSS } from '../../styles/utils/getBorderRadiusCSS';
import { getBoxShadowCSS } from '../../styles/utils/getBoxShadowCSS';
import { getSpacingCSS } from '../../styles/utils/getSpacingCSS';
import Button from '../StyledButton';

export const StyledButtonGroupButton = styled(Button)<{
  checked: boolean;
  isEditing?: boolean;
}>`
  ${({ theme, checked }) => {
    return `

    background-color: ${
      checked
        ? theme.buttonGroupSelectedBackgroundColor ||
          theme.buttonBackgroundColor ||
          theme.primaryColor ||
          colors['gray-700']
        : theme.buttonGroupUnselectedBackgroundColor || colors['gray-300']
    };

    color: ${
      !checked
        ? theme.buttonGroupUnselectedTextColor || colors['gray-700']
        : theme.buttonGroupSelectedTextColor
    };

    ${
      checked
        ? getBoxShadowCSS(theme.buttonGroupSelectedShadow)
        : getBoxShadowCSS(theme.buttonGroupUnselectedShadow)
    };

    ${
      checked
        ? getBorderCSS(theme.buttonGroupSelectedBorder)
        : getBorderCSS(theme.buttonGroupUnselectedBorder)
    };

    ${
      checked
        ? getBorderRadiusCSS(theme.buttonGroupSelectedBorderRadius)
        : getBorderRadiusCSS(theme.buttonGroupUnselectedBorderRadius)
    };

    ${getSpacingCSS(theme.buttonGroupPadding)}

    &:hover {
      background-color: ${theme.buttonGroupHoverBackgroundColor};
      color: ${theme.buttonGroupHoverTextColor};
      ${getBorderCSS(theme.buttonGroupHoverBorder)}
      ${getBorderRadiusCSS(theme.buttonGroupHoverBorderRadius)}
      ${getBoxShadowCSS(theme.buttonGroupHoverShadow)};
    }
  `;
  }}
`;

export const StyledFirstButton = styled(StyledButtonGroupButton)`
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  margin-bottom: 0px;
`;

export const StyledNormalButton = styled(StyledButtonGroupButton)`
  border-radius: 0px;
  margin-bottom: 0px;
`;

export const StyledLastButton = styled(StyledButtonGroupButton)`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  margin-bottom: 0px;
`;

export const StyledLabelValue = styled.span`
  font-size: 0.75rem;
`;

export const StyledButtonGroupContainer = styled.div<{
  gutters: number;
}>`
  ${({ gutters }) => {
    if (gutters === 0) return '';
    return `

      display: flex;
      gap: ${gutters}rem;
    `;
  }}
`;
