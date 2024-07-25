import { lighten } from 'polished';
import readableColor from 'polished/lib/color/readableColor';
import transparentize from 'polished/lib/color/transparentize';
import styled, { css } from 'styled-components';

import { colors } from '../../../styles';
import hexAToRGBA from '../../../styles/utils/hexAToRGBA';

export const getReadableColor = ({
  color = '',
  colorIfLight = colors.black,
  colorIfDark = colors.white,
}) => {
  const rgba = hexAToRGBA(color);

  return readableColor(rgba, colorIfLight, colorIfDark);
};

const StyledArrowButton = styled.button<{
  disabled: boolean;
  isLeft?: boolean;
  isRight?: boolean;
}>`
  appearance: none;
  display: inline-block;
  vertical-align: middle;
  background: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  user-select: none;

  ${({ disabled, isLeft, isRight, theme }) => {
    const backgroundColor =
      theme.backgroundColor || theme.primaryColor || colors['gray-700'];

    const textColor = getReadableColor({ color: backgroundColor });

    return css`
      background-color: ${backgroundColor};

      &:hover:not([disabled]) {
        background-color: ${lighten(0.1, hexAToRGBA(backgroundColor))};
      }

      ${isLeft &&
      `
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right: 1px solid ${transparentize(0.6, colors.white)};
      `}

      ${isRight &&
      `
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    `}

    color: ${disabled ? transparentize(0.6, textColor) : textColor};
    `;
  }}
`;

export default StyledArrowButton;
