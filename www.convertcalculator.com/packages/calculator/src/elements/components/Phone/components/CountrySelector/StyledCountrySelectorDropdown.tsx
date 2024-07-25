import styled from 'styled-components';

const StyledCountrySelectorDropdown = styled.ul`
  position: absolute;
  z-index: 9910;
  top: 32px;
  left: 0;
  display: flex;
  width: 300px;
  max-height: 200px;
  flex-direction: column;
  padding: 4px 0;
  margin: 0;
  background-color: #fff;

  box-shadow: 2px 2px 16px rgb(0 0 0 / 25%);

  list-style: none;
  overflow-y: scroll;

  outline: none;
`;

export default StyledCountrySelectorDropdown;
