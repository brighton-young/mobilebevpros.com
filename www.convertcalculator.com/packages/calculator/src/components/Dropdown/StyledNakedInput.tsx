import styled from 'styled-components';

import StyledInput from '../Input/StyledInput';

const StyledNakedInput = styled(StyledInput)`
  border: 0 !important;
  box-shadow: none !important;
  margin: 0 !important;
  font-size: 1rem !important;
  padding: 0 !important;
  background-color: transparent !important;
  min-height: 0px;

  &:focus {
    outline: none;
    border: none;
    background-color: transparent;
    box-shadow: none;
  }
`;

export default StyledNakedInput;
