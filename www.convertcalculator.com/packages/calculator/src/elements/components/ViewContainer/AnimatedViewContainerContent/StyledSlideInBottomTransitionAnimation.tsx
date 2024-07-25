import styled from 'styled-components';

const StyledSlideInBottomTransitionAnimation = styled.div<{
  transitionDuration: number;
  addFadeToAnimation: boolean;
}>`
  ${(props) => {
    return `
      transition: opacity ${props.transitionDuration}ms, transform ${props.transitionDuration}ms;`;
  }}

  .direction-FORWARD &.view-enter {
    transform: translateY(100%);
    ${(props) => {
      if (props.addFadeToAnimation) {
        return `opacity: 0;`;
      }
      return '';
    }}
  }
  .direction-FORWARD &.view-enter-active {
    transform: translateY(0%);
    opacity: 1;
  }

  .direction-FORWARD &.view-exit {
    opacity: 1;
    transform: translateY(0%);
  }
  .direction-FORWARD &.view-exit-active {
    ${(props) => {
      if (props.addFadeToAnimation) {
        return `opacity: 0;`;
      }
      return '';
    }}
    transform: translateY(-80%);
  }

  .direction-BACKWARD &.view-enter {
    transform: translateY(-100%);
    ${(props) => {
      if (props.addFadeToAnimation) {
        return `opacity: 0;`;
      }
      return '';
    }}
  }
  .direction-BACKWARD &.view-enter-active {
    transform: translateY(0%);
    opacity: 1;
  }

  .direction-BACKWARD &.view-exit {
    opacity: 1;
    transform: translateY(0%);
  }
  .direction-BACKWARD &.view-exit-active {
    ${(props) => {
      if (props.addFadeToAnimation) {
        return `opacity: 0;`;
      }
      return '';
    }}
    transform: translateY(100%);
  }
`;

export default StyledSlideInBottomTransitionAnimation;
