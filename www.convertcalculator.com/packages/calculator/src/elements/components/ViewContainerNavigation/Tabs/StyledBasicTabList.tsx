import styled from 'styled-components';

export const StyledBasicTabList = styled.ol<{
  direction: 'HORIZONTAL' | 'VERTICAL';
}>`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;

  ${({ theme }) => {
    return `
       gap: ${theme.tabGroupGutter ?? 8}px;
    `;
  }}

  ${({ direction }) => {
    if (direction === 'VERTICAL') {
      return `
       flex-direction: column;
       align-items: flex-start;
    `;
    }
    return '';
  }}
  
  .cc ol& {
    margin-bottom: 0;
    padding-left: 0;
    list-style-type: none;
  }

  .foobar {
    background: #9e9e9e;
  }
`;
