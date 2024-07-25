import styled from 'styled-components';

const StyledHeightTransitionAnimation = styled.div<{
  transitionDuration: number;
  addFadeToAnimation: boolean;
}>`
  ${(props) => {
    return `
      transition: all ${props.transitionDuration}ms;`;
  }}
  &.view-enter {
    ${(props) => {
      if (props.addFadeToAnimation) {
        return `opacity: 0;`;
      }
      return '';
    }}
    min-height: 0;
    max-height: 0;
  }

  &.view-enter-active {
    opacity: 1;
    max-height: 100vh;
  }

  &.view-exit {
    opacity: 1;
    max-height: 100vh;
  }
  &.view-exit-active,
  &.view-exit-done {
    ${(props) => {
      if (props.addFadeToAnimation) {
        return `opacity: 0;`;
      }
      return '';
    }}
    max-height: 0;
  }
`;

export default StyledHeightTransitionAnimation;
