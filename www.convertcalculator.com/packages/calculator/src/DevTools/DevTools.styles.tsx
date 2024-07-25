import styled from 'styled-components';

import { colors } from '../styles';

export const StyledWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background: ${colors['gray-800']};
  color: ${colors['gray-200']};
  display: flex;
  flex-direction: column;
`;

export const StyledHeader = styled.div`
  flex-shrink: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors['gray-700']};
  padding: 0.5rem;
  font-size: 14px;
`;

export const StyledLink = styled.a`
  color: ${colors['gray-200']};
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${colors['gray-100']};
  }
`;

export const StyledBody = styled.div`
  flex-grow: 1;
  padding: 0.5rem;
  overflow: auto;
  height: 100%;
  font-size: 12px;
  color: ${colors['gray-200']};
`;
