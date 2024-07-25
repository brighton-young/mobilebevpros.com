import styled from 'styled-components';

const StyledDropDownArrow = styled.div`
  border-top: 4px solid #97a1b6;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  margin-left: 6px;
  transition: all 100ms ease-out;

  &--active {
    transform: rotateX(180deg);
  }
`;

export default StyledDropDownArrow;
