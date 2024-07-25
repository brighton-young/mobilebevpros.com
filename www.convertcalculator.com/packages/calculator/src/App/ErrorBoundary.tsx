import React from 'react';

import { ErrorBoundary as ErrorBoundaryComponent } from 'react-error-boundary';

import Callout from '../components/Callout';
import ErrorFallback from '../components/ErrorFallback';

const ErrorBoundary = ({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: {
    status?: string;
    message?: string;
    code?: number;
  };
}) => {
  if (error) {
    return (
      <Callout variant="alert">
        {error.status || 500}
        {': '}
        {error.message}
      </Callout>
    );
  }

  return (
    <ErrorBoundaryComponent
      // eslint-disable-next-line react/no-unstable-nested-components
      fallbackRender={(fallbackProps) => {
        return (
          <ErrorFallback {...fallbackProps}>
            Something went wrong. Please contact support.
          </ErrorFallback>
        );
      }}
    >
      {children}
    </ErrorBoundaryComponent>
  );
};

export default ErrorBoundary;
