import { Fragment, memo } from 'react';

import { dequal } from 'dequal';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

import { useIsEditing } from '../CalculatorState';
import { colors } from '../styles';
import { AnyElement } from '../types';

import ErrorFallback from './ErrorFallback/ErrorFallback';
import TreeItem from './TreeItem';

export type TreeItemType = {
  children: TreeItemType[];
  collection: 'elements' | 'formulas' | 'questions';
} & AnyElement;
export type Tree = TreeItemType[];
export type TreePath = number[];

const StyledEmptyState = styled.div`
  text-align: center;
  margin: 5rem 0;
  width: 100%;
  color: ${colors.darkGray};
`;

type TreeRendererProps = {
  items: Tree;
  treePath?: TreePath;
  settings: Record<string, any>;
};

const TreeRenderer = ({
  items = [],
  treePath,
  settings,
}: TreeRendererProps) => {
  const isEditing = useIsEditing();

  const shopEmptyState =
    isEditing && items.length === 0 && treePath.length === 1;

  return (
    <>
      {shopEmptyState && (
        <StyledEmptyState>
          Add an element to the canvas to get started
        </StyledEmptyState>
      )}
      {items.map((item, index) => {
        return (
          <Fragment key={item._id}>
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
            >
              <TreeItem
                isEditing={isEditing}
                item={item}
                treeRenderer={
                  <TreeRendererWithMemo
                    treePath={[...treePath, index]}
                    items={item.children}
                    settings={settings}
                  />
                }
                treePath={[...treePath, index]}
                settings={settings}
              />
            </ErrorBoundary>
          </Fragment>
        );
      })}
    </>
  );
};

const TreeRendererWithMemo = memo(TreeRenderer, dequal);

export default TreeRendererWithMemo;
