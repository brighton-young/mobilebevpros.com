import { Fragment, memo } from 'react';

import { dequal } from 'dequal';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

import type { CalculatorContent } from '@cc/db';

import { colors } from '../../styles';
import ErrorFallback from '../ErrorFallback/ErrorFallback';

import CalculatorItem from './CalculatorItem';

const StyledEmptyState = styled.div`
  text-align: center;
  margin: 5rem 0;
  width: 100%;
  color: ${colors.darkGray};
`;

const CalculatorItems = ({
  isEditing,
  items = [],
  onInteraction,
  showErrors,
  selectedViewIndex,
  settings,
  type,
}: {
  isEditing: boolean;
  items: CalculatorContent['items'];
  onInteraction: (interaction: any) => void;
  showErrors: boolean;
  selectedViewIndex: number;
  settings: Record<string, any>;
  type?: 'canvas';
}) => {
  const shopEmptyState = isEditing && items.length === 0 && type === 'canvas';

  return (
    <>
      {shopEmptyState && (
        <StyledEmptyState>
          Add an element to the canvas to get started
        </StyledEmptyState>
      )}
      {items.map(({ children, itemId }) => {
        return (
          <Fragment key={itemId}>
            <ErrorBoundary
              // eslint-disable-next-line react/no-unstable-nested-components
              fallbackRender={({ resetErrorBoundary }) => {
                return (
                  <ErrorFallback>
                    Something went wrong. Undo your last action or remove this
                    element. If you aren&apos;t able to resolve this issue,
                    please contact support. After fixing the issue,{' '}
                    <button
                      className="text-link"
                      type="button"
                      onClick={resetErrorBoundary}
                    >
                      reset this error
                    </button>
                    .
                  </ErrorFallback>
                );
              }}
              onReset={() => {
                // reset the state of your app so the error doesn't happen again
              }}
            >
              <CalculatorItem
                isEditing={isEditing}
                itemChildren={children}
                itemId={itemId}
                onInteraction={onInteraction}
                showErrors={showErrors}
                selectedViewIndex={selectedViewIndex}
                settings={settings}
              />
            </ErrorBoundary>
          </Fragment>
        );
      })}
    </>
  );
};

export default memo(CalculatorItems, dequal);
