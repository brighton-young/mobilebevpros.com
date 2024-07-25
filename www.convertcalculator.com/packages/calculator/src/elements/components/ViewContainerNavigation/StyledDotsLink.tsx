import readableColor from 'polished/lib/color/readableColor';
import styled from 'styled-components';

import { colors } from '../../../styles';
import hexAToRGBA from '../../../styles/utils/hexAToRGBA';

const getReadableColor = ({
  color = '',
  colorIfLight = colors.black,
  colorIfDark = colors.white,
}) => {
  const rgba = hexAToRGBA(color);

  return readableColor(rgba, colorIfLight, colorIfDark);
};

export const StyledDotsLink = styled.li<{
  isActive: boolean;
  isNumbered: boolean;
  disabled: boolean;
}>`
  ${({ isActive, theme, disabled }) => {
    const backgroundColor =
      theme.backgroundColor || theme.primaryColor || colors['gray-700'];

    const textColor = getReadableColor(backgroundColor);

    return `
    background-color: ${isActive ? backgroundColor : colors.lightGray};

    &:hover:not([disabled]) {
      background-color: ${backgroundColor};
    }

    color: ${isActive ? textColor : colors.mediumGray};
    cursor: ${!disabled ? 'pointer' : 'default'};
  `;
  }}

  display: inline-block;

  border-radius: 50%;

  text-align: center;

  ${({ isNumbered }) => {
    if (isNumbered) {
      return `
        width: 1.75rem;
        height: 1.75rem;
        line-height: 1.75rem;
        margin-right: 1rem;
      `;
    }

    return `
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.6rem;
      `;
  }}

  &:last-child {
    margin-right: 0;
  }
`;
