import React from 'react';

import styled from 'styled-components';

import { colors } from '../../styles';

export const AlertMessage = styled.div`
  padding: 1rem;
  color: ${colors.alertColor};
`;

export const AlertWrapper = styled.div`
  background: ${colors.lightGray};
  border: 2px dashed ${colors.alertColor};
`;

type ErrorFallbackProps = {
  children: React.ReactNode;
};

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ children }) => {
  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') return <></>;

  return (
    <AlertWrapper>
      <AlertMessage>{children}</AlertMessage>
    </AlertWrapper>
  );
};

export default ErrorFallback;
