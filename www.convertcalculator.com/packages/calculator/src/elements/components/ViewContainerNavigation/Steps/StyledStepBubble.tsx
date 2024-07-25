import { lighten } from 'polished';
import readableColor from 'polished/lib/color/readableColor';
import styled from 'styled-components';

import { colors } from '../../../../styles';
import hexAToRGBA from '../../../../styles/utils/hexAToRGBA';

const getReadableColor = ({
  color = '',
  colorIfLight = colors.black,
  colorIfDark = colors.white,
}) => {
  const rgba = hexAToRGBA(color);

  return readableColor(rgba, colorIfLight, colorIfDark);
};

export const StyledStepBubble = styled.div<{
  isActive: boolean;
  isCompleted: boolean;
  disabled: boolean;
}>`
  ${({ isActive, theme, disabled, isCompleted }) => {
    const backgroundColor =
      theme.stepsBubbleBackgroundColor || colors.lightGray;
    const completedBackgroundColor =
      theme.stepsBubbleCompletedBackgroundColor ||
      theme.backgroundColor ||
      theme.primaryColor ||
      colors['gray-700'];
    const activeBackgroundColor =
      theme.stepsBubbleActiveBackgroundColor || completedBackgroundColor;

    // eslint-disable-next-line no-nested-ternary
    const currentBackgroundColor = isCompleted
      ? completedBackgroundColor
      : isActive
      ? activeBackgroundColor
      : backgroundColor;

    const textColor =
      theme.stepsBubbleTextColor || getReadableColor(backgroundColor);
    const completedTextColor =
      theme.stepsBubbleCompletedTextColor ||
      getReadableColor(completedBackgroundColor);
    const activeTextColor =
      theme.stepsBubbleActiveTextColor ||
      getReadableColor(activeBackgroundColor);

    // eslint-disable-next-line no-nested-ternary
    const currentTextColor = isCompleted
      ? completedTextColor
      : isActive
      ? activeTextColor
      : textColor;

    return `
      background-color: ${currentBackgroundColor};
      
      &:hover:not([disabled]) {
        background-color: ${activeBackgroundColor};
      }
      
      color: ${currentTextColor};
      cursor: ${!disabled ? 'pointer' : 'default'};
      
      ${
        isActive &&
        `box-shadow: 0 0 0 3px ${
          theme.stepsBubbleActiveBorderColor ||
          lighten(0.5, hexAToRGBA(activeBackgroundColor))
        };`
      }
  `;
  }}

  align-items: center;
  border-radius: 14px;

  display: inline-flex;
  font-size: 13px;
  font-weight: bold;
  height: 28px;
  justify-content: center;
  line-height: 27px;
  min-width: 28px;

  transition-delay: 0.1s;
  transition-duration: 0.1s;
`;

export const StyledStepDot = styled.div`
  border-radius: 10px;
  height: 10px;
  width: 10px;

  background-color: white;
`;
