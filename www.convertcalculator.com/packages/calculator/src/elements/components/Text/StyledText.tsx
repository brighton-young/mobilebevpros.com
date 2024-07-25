import styled, { css } from 'styled-components';

import { getSizeWithUnitCSS } from '../../../styles/utils/getSizeWithUnitCSS';

export const StyledText = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => {
    return css`
      font-family: ${theme.textFontFamily || theme.fontFamily};
      font-size: ${getSizeWithUnitCSS(theme.textFontSize) ||
      getSizeWithUnitCSS(theme.fontSize)};
      font-weight: ${theme.textFontWeight || theme.fontWeight};
      line-height: ${getSizeWithUnitCSS(theme.textLineHeight) ||
      getSizeWithUnitCSS(theme.lineHeight)};
      color: ${theme.textTextColor || theme.textColor};
      text-align: ${theme.textTextAlign || theme.textAlign};
      text-transform: ${theme.textTextTransform || theme.textTransform};
      font-style: ${theme.textFontStyle || theme.fontStyle};

      p,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: ${theme.textFontFamily || theme.fontFamily};
        font-size: ${getSizeWithUnitCSS(theme.textFontSize) ||
        getSizeWithUnitCSS(theme.fontSize)};
        font-weight: ${theme.textFontWeight || theme.fontWeight};
        line-height: ${getSizeWithUnitCSS(theme.textLineHeight) ||
        getSizeWithUnitCSS(theme.lineHeight)};
        color: ${theme.textTextColor || theme.textColor};
        text-align: ${theme.textTextAlign || theme.textAlign};
        text-transform: ${theme.textTextTransform || theme.textTransform};
        font-style: ${theme.textFontStyle || theme.fontStyle} !important;
      }
    `;
  }}
`;
