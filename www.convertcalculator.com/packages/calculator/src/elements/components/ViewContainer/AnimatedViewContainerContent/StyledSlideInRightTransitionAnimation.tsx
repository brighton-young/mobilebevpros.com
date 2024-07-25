import styled from 'styled-components';

const StyledSlideInRightTransitionAnimation = styled.div<{
  transitionDuration: number;
  addFadeToAnimation: boolean;
}>`
  ${(props) => {
    return `
      transition: opacity ${props.transitionDuration}ms, transform ${props.transitionDuration}ms;`;
  }}

  .direction-FORWARD &.view-enter {
    transform: translateX(100%);
    ${(props) => {
      if (props.addFadeToAnimation) {
        return `opacity: 0;`;
      }
      return '';
    }}
  }
  .direction-FORWARD &.view-enter-active {
    transform: translateX(0%);
    opacity: 1;
  }

  .direction-FORWARD &.view-exit {
    opacity: 1;
    transform: translateX(0%);
  }
  .direction-FORWARD &.view-exit-active {
    ${(props) => {
      if (props.addFadeToAnimation) {
        return `opacity: 0;`;
      }
      return '';
    }}
    transform: translateX(-100%);
  }

  .direction-BACKWARD &.view-enter {
    transform: translateX(-100%);
    ${(props) => {
      if (props.addFadeToAnimation) {
        return `opacity: 0;`;
      }
      return '';
    }}
  }
  .direction-BACKWARD &.view-enter-active {
    transform: translateX(0%);
    opacity: 1;
  }

  .direction-BACKWARD &.view-exit {
    opacity: 1;
    transform: translateX(0%);
  }
  .direction-BACKWARD &.view-exit-active {
    ${(props) => {
      if (props.addFadeToAnimation) {
        return `opacity: 0;`;
      }
      return '';
    }}
    transform: translateX(100%);
  }
`;

export default StyledSlideInRightTransitionAnimation;
