import styled, { css } from 'styled-components';

import { getBorderCSS } from '../../styles/utils/getBorderCSS';
import { getBorderRadiusCSS } from '../../styles/utils/getBorderRadiusCSS';
import { getBoxShadowCSS } from '../../styles/utils/getBoxShadowCSS';
import { getSizeWithUnitCSS } from '../../styles/utils/getSizeWithUnitCSS';
import { getSpacingCSS } from '../../styles/utils/getSpacingCSS';

export const StyledInput = styled.input<{ $showInputIcon?: boolean }>`
  display: block;
  box-sizing: border-box;
  width: 100%;
  appearance: none;
  resize: none;
  transition-property: all;
  transition-duration: 150ms;

  &:focus {
    outline: none;
  }

  ${({ theme, $showInputIcon }) => {
    return css`
      font-family: ${theme.inputFontFamily || theme.fontFamily || 'inherit'};
      font-size: ${getSizeWithUnitCSS(theme.inputFontSize) ||
      getSizeWithUnitCSS(theme.fontSize) ||
      'inherit'};
      font-weight: ${theme.inputFontWeight || theme.fontWeight};
      line-height: ${getSizeWithUnitCSS(theme.inputLineHeight) ||
      getSizeWithUnitCSS(theme.lineHeight)};
      color: ${theme.inputTextColor || theme.textColor};
      text-align: ${theme.inputTextAlign};
      text-transform: ${theme.inputTextTransform || theme.textTransform};
      font-style: ${theme.inputFontStyle || theme.fontStyle};

      &::placeholder {
        color: ${theme.inputPlaceholderTextColor};
        opacity: 1;
      }
      &::-webkit-input-placeholder {
        color: ${theme.inputPlaceholderTextColor};
      }
      &::-ms-input-placeholder {
        color: ${theme.inputPlaceholderTextColor};
      }
      &::-moz-placeholder {
        color: ${theme.inputPlaceholderTextColor};
        opacity: 1;
      }

      ${getSpacingCSS(theme.inputSpacing)}

      // If the input has an icon, add extra padding to the left to make room for it
    ${Boolean($showInputIcon) &&
      `padding-left: ${(theme.inputSpacing.paddingLeft ?? 0) + 30}px;`}

    background-color: ${theme.inputBackgroundColor || theme.backgroundColor};
      color: ${theme.inputTextColor || theme.textColor};

      ${getBorderCSS(theme.inputBorder)}
      ${getBorderRadiusCSS(theme.inputBorderRadius)}
      
      ${getBoxShadowCSS(theme.inputShadow)};

      &:hover {
        background-color: ${theme.inputHoverBackgroundColor};
        color: ${theme.inputHoverTextColor};

        ${getBorderCSS(theme.inputHoverBorder || theme.inputBorder)}
        ${getBorderRadiusCSS(
          theme.inputHoverBorderRadius || theme.inputBorderRadius,
        )}

        ${getBoxShadowCSS(theme.inputShadow)};
      }

      &:focus {
        background-color: ${theme.inputFocusBackgroundColor};
        color: ${theme.inputFocusTextColor};

        ${getBorderCSS(theme.inputFocusBorder || theme.inputBorder)}
        ${getBorderRadiusCSS(
          theme.inputFocusBorderRadius || theme.inputBorderRadius,
        )}
        
        ${getBoxShadowCSS(theme.inputShadow)};
      }

      height: ${getSizeWithUnitCSS(theme.inputHeight)};
    `;
  }}
`;

export default StyledInput;
