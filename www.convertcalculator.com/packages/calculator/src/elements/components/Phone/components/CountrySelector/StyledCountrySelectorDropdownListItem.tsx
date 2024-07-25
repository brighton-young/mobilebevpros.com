import styled from 'styled-components';

const StyledCountrySelectorDropdownListItem = styled.li<{
  isSelected: boolean;
  isFocused: boolean;
}>`
  display: flex;
  min-height: 28px; // min-height (instead of just height) for safari compatibility
  box-sizing: border-box;
  align-items: center;
  padding: 4px 12px;

  font-size: 14px;

  &:hover {
    background-color: whitesmoke;
    cursor: pointer;
  }

  ${({ isSelected }) => {
    return isSelected && 'background-color: whitesmoke;';
  }}
  ${({ isFocused }) => {
    return isFocused && 'background-color: whitesmoke;';
  }}
`;

export default StyledCountrySelectorDropdownListItem;
