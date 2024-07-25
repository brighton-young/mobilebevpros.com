import styled from 'styled-components';

type FlexProps = {
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  gap?: string;
};

export const Flex = styled.div<FlexProps>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ gap }) => {
    return gap;
  }};
  justify-content: ${({ justifyContent }) => {
    return justifyContent || 'flex-start';
  }};
`;

export const FlexChild = styled.div`
  flex: 1;
`;
