import styled from 'styled-components';

export const StyledStep = styled.li<{
  isActive: boolean;
  stepsShowNumbers: boolean;
  disabled: boolean;
  isCompleted: boolean;
}>`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;

  position: relative;

  ${({ isCompleted, theme }) => {
    const backgroundColor =
      (isCompleted
        ? theme.stepsBarCompletedTrackColor
        : theme.stepsBarTrackColor) || '#e0e0e0;';

    return `
      &:not(:last-child)::after {
        content: '';
        display: block;
        top: calc(13px);
        position: absolute;
        left: calc(50% + 22px);
        right: calc(-50% + 22px);
        height: 2px;
        background-color: ${backgroundColor};
        order: -1;
      }`;
  }}
`;
