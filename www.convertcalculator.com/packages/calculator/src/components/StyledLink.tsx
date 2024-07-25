import styled, { css } from 'styled-components';

import { getFontFamilyCSS } from '../styles/utils/getFontFamilyCSS';
import { getSizeWithUnitCSS } from '../styles/utils/getSizeWithUnitCSS';

const StyledLink = styled.a`
  background: none;
  padding: 0;
  border: 0;

  ${({ theme }) => {
    return css`
      color: ${theme.linkTextColor || theme.textColor};
      ${getFontFamilyCSS(theme.fontFamily)};
      font-size: ${getSizeWithUnitCSS(
        theme.linkFontSize || theme.buttonFontSize,
      )};
      line-height: ${getSizeWithUnitCSS(theme.lineHeight)};
      font-style: ${theme.linkFontStyle || theme.fontStyle};
      font-weight: ${theme.linkFontWeight || theme.fontWeight};
      text-decoration: ${theme.linkTextDecoration};

      &:hover {
        color: ${theme.linkHoverTextColor};
        text-decoration: ${theme.linkHoverTextDecoration};
        font-style: ${theme.linkHoverFontStyle};
        font-weight: ${theme.linkHoverFontWeight};
      }
    `;
  }}

  ${({ color }) => {
    if (!color) return undefined;

    return css`
      color: ${color};
    `;
  }}

  cursor: pointer;

  display: flex;
  gap: 0.5rem;
  align-items: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default StyledLink;
