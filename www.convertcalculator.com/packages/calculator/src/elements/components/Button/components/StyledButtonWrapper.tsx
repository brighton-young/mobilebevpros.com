import styled from 'styled-components';

const StyledButtonWrapper = styled.div<{
  alignment: 'left' | 'center' | 'right' | 'full';
}>`
  display: block;
  width: 100%;

  ${({ alignment }) => {
    return `
    text-align: ${alignment === 'full' ? 'center' : alignment}
  `;
  }};
`;

export default StyledButtonWrapper;
