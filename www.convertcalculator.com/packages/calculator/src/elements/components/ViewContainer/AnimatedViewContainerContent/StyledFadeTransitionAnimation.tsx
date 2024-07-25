import styled from 'styled-components';

const StyledFadeTransitionAnimation = styled.div<{
  transitionDuration: number;
}>`
  ${(props) => {
    return `
      transition: opacity ${props.transitionDuration}ms ease-in;`;
  }}

  &.view-enter {
    opacity: 0;
  }

  &.view-enter-active,
  &.view-enter-done {
    opacity: 1;
  }

  &.view-exit {
    opacity: 1;
  }

  &.view-exit-active,
  &.view-exit-done {
    opacity: 0;
  }
`;

export default StyledFadeTransitionAnimation;
