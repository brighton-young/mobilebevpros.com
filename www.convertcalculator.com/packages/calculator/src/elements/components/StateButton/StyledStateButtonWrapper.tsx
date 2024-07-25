import styled from 'styled-components';

export const StyledStateButtonWrapper = styled.div<{
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
