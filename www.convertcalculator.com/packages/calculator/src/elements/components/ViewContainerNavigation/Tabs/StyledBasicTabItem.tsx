import styled from 'styled-components';

import { getReadableColor } from '../../../../components/StyledButton/StyledButton';
import { colors } from '../../../../styles';
import { getBorderCSS } from '../../../../styles/utils/getBorderCSS';
import { getBorderRadiusCSS } from '../../../../styles/utils/getBorderRadiusCSS';
import { getBoxShadowCSS } from '../../../../styles/utils/getBoxShadowCSS';
import { getSpacingCSS } from '../../../../styles/utils/getSpacingCSS';

export const StyledBasicTabItem = styled.li<{
  isSelected: boolean;
}>`
  display: inline-block;
  padding: 8px 12px;
  cursor: pointer;

  border-radius: 4px;

  ${({ theme, isSelected }) => {
    const unselectedBackgroundColor =
      theme.tabUnselectedBackgroundColor || colors['gray-300'];

    const selectedBackgroundColor =
      theme.tabSelectedBackgroundColor ||
      theme.primaryColor ||
      colors['gray-700'];

    const selectedTextColor =
      theme.tabSelectedTextColor ||
      getReadableColor({
        color: selectedBackgroundColor,
      });
    const unselectedTextColor =
      theme.tabUnselectedTextColor ||
      getReadableColor({
        color: unselectedBackgroundColor,
      });

    return `

    background-color: ${
      isSelected ? selectedBackgroundColor : unselectedBackgroundColor
    };

    color: ${isSelected ? selectedTextColor : unselectedTextColor};

    ${getBoxShadowCSS(theme.tabShadow)};
    ${getBorderCSS(theme.tabBorder)};
    ${getBorderRadiusCSS(theme.tabBorderRadius)};
    ${getSpacingCSS(theme.tabPadding)}

    &:hover {
      background-color: ${
        theme.tabHoverBackgroundColor || selectedBackgroundColor
      };
      color: ${theme.tabHoverTextColor || selectedTextColor};
    }
  `;
  }}
`;
