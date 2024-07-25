import styled from 'styled-components';

const StyledCountrySelectorButton = styled.button`
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  padding: 0;

  margin: 0;
  // for old safari compatibility
  appearance: button;
  /* stylelint-disable-next-line */
  -webkit-appearance: button;
  cursor: pointer;
  text-transform: none;
  user-select: none;

  background: inherit;
`;

export default StyledCountrySelectorButton;
