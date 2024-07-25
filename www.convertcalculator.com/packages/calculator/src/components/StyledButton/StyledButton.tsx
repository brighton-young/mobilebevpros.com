import { darken } from 'polished';
import readableColor from 'polished/lib/color/readableColor';
import styled from 'styled-components';

import { colors } from '../../styles';
import { getBorderCSS } from '../../styles/utils/getBorderCSS';
import { getBorderRadiusCSS } from '../../styles/utils/getBorderRadiusCSS';
import { getBoxShadowCSS } from '../../styles/utils/getBoxShadowCSS';
import { getFontFamilyCSS } from '../../styles/utils/getFontFamilyCSS';
import { getSizeWithUnitCSS } from '../../styles/utils/getSizeWithUnitCSS';
import { getSpacingCSS } from '../../styles/utils/getSpacingCSS';
import hexAToRGBA from '../../styles/utils/hexAToRGBA';

export const getReadableColor = ({
  color = '',
  colorIfLight = 'black',
  colorIfDark = 'white',
}) => {
  const rgba = hexAToRGBA(color);

  return readableColor(rgba, colorIfLight, colorIfDark);
};

const Button = styled.button<{
  isEditing?: boolean;
  disabled?: boolean;
  alignment?: 'center' | 'left' | 'right' | 'full';
}>`
  ${({ theme, alignment }) => {
    const backgroundColor =
      theme.buttonBackgroundColor || theme.primaryColor || colors['gray-700'];

    const color =
      theme.buttonTextColor ||
      getReadableColor({
        color: backgroundColor,
      });

    return `
    background-color: ${backgroundColor};
    color: ${color};
    
    ${getFontFamilyCSS(
      theme.buttonFontFamily || theme.fontFamily || 'inherit',
    )};
    
    font-size: ${getSizeWithUnitCSS(theme.buttonFontSize) || 'inherit'};
    font-weight: ${theme.buttonFontWeight || theme.fontWeight};

    ${getBorderCSS(theme.buttonBorder)}
    ${getBorderRadiusCSS(theme.buttonBorderRadius)}
    
    ${getBoxShadowCSS(theme.buttonShadow)};

    line-height: ${
      getSizeWithUnitCSS(theme.buttonLineHeight) ||
      getSizeWithUnitCSS(theme.lineHeight)
    };
    
    text-align: center;

    width: ${alignment === 'full' ? '100%' : 'auto'};
    
   
    
    ${getSpacingCSS(theme.buttonSpacing)}

    &:hover {
      background-color: ${
        theme.buttonHoverBackgroundColor ||
        darken(0.05, hexAToRGBA(backgroundColor))
      };
      color: ${theme.buttonHoverTextColor || color};
      ${getBorderCSS(theme.buttonHoverBorder)}
      ${getBorderRadiusCSS(theme.buttonHoverBorderRadius)}
    }

    box-sizing: border-box;
  `;
  }}

  display: inline-block;
  vertical-align: middle;
  margin: 0rem !important;

  cursor: pointer;
  appearance: none;
  transition: background-color 0.25s ease-out, color 0.25s ease-out;

  &:disabled {
    ${({ isEditing }) => {
      return (
        !isEditing &&
        `
      opacity: 0.5;
    `
      );
    }}
    cursor: not-allowed;
  }

  ${({ disabled, isEditing }) => {
    return (
      disabled &&
      `
      opacity: ${isEditing ? 1 : 0.5};
      cursor: not-allowed;
    `
    );
  }}

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.5);
  }
`;

export default Button;
