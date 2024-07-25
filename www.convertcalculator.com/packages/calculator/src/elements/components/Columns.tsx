import React from 'react';

import styled from 'styled-components';

import { useCanvasSize, useFeatureFlags } from '../../CalculatorState';
import CalculatorItems from '../../components/CalculatorItems';
import ElementStyleWrapper, {
  DefaultStyledItem,
} from '../../components/ElementStyleWrapper';

const StyledColumns = styled(DefaultStyledItem)`
  display: flex;
  flex-wrap: ${({ shouldStack }) => {
    return shouldStack && 'wrap';
  }};
  gap: ${({ gutters }) => {
    return `${gutters || 0}rem`;
  }};
  justify-content: ${({ alignment }) => {
    return getJustifyContent(alignment);
  }};
  align-items: ${({ alignItems }) => {
    return getAlignItems(alignItems);
  }};
  min-height: ${({ hasChildren, isEditing }) => {
    return isEditing && !hasChildren && '5rem';
  }};
`;

type ColumnsProps = {
  hasChildren: boolean;
  isHidden: boolean;
  itemChildren?: any[];
  treeRenderer: React.JSX.Element;
  element: ColumnsElement;
};

export type ColumnsElement = {
  type: 'columns';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  columns: {
    alignItems: 'top' | 'center' | 'bottom';
    alignment: 'left' | 'center' | 'right' | 'between' | 'around';
    gutters: number;
    stackOnMobile: boolean;
    stackOnTablet: boolean;
  };
};

const Columns = (props: ColumnsProps) => {
  const {
    hasChildren,
    isHidden,
    itemChildren = [],
    element,
    treeRenderer,
  } = props;
  const { columns } = element;
  const { stackOnMobile, stackOnTablet } = columns;

  const { isMobile, isTablet } = useCanvasSize();

  const shouldStack =
    (isMobile && stackOnMobile) || (isTablet && stackOnTablet);

  const { dataAsPropsRefactor } = useFeatureFlags();

  return (
    <ElementStyleWrapper
      collection="elements"
      element={element}
      isHidden={isHidden}
      styledItem={StyledColumns}
      alignment={columns.alignment}
      alignItems={columns.alignItems}
      hasChildren={dataAsPropsRefactor ? hasChildren : itemChildren.length}
      gutters={columns.gutters}
      shouldStack={shouldStack}
    >
      {dataAsPropsRefactor ? (
        treeRenderer
      ) : (
        <CalculatorItems {...props} items={itemChildren} />
      )}
    </ElementStyleWrapper>
  );
};

const getJustifyContent = (alignment) => {
  if (alignment === 'left') return 'flex-start';
  if (alignment === 'center') return 'center';
  if (alignment === 'right') return 'flex-end';
  if (alignment === 'between') return 'space-between';
  if (alignment === 'around') return 'space-around';

  return 'space-between';
};

const getAlignItems = (alignItems) => {
  if (alignItems === 'top') return 'flex-start';
  if (alignItems === 'center') return 'center';
  if (alignItems === 'bottom') return 'flex-end';

  return 'stretch';
};

export default Columns;
