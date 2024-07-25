import React from 'react';

import readableColor from 'polished/lib/color/readableColor';
import styled, { css } from 'styled-components';

import {
  useCanvasSize,
  useFeatureFlags,
  useOutput,
} from '../../CalculatorState';
import CalculatorItems from '../../components/CalculatorItems';
import ElementStyleWrapper, {
  DefaultStyledItem,
} from '../../components/ElementStyleWrapper';
import { colors } from '../../styles';

const StyledColumn = styled(DefaultStyledItem)`
  width: ${({ columnCount, shouldStack }) => {
    return shouldStack ? '100%' : `${(columnCount / 12) * 100}%`;
  }};

  position: ${({ shouldStick }) => {
    return shouldStick && 'sticky';
  }};
  top: ${({ shouldStick }) => {
    return shouldStick && '0rem';
  }};
  overflow: ${({ shouldStick }) => {
    return shouldStick && 'auto';
  }};

  ${({ shouldStick }) => {
    return (
      shouldStick &&
      css`
        position: sticky;
        top: 0rem;
        overflow: auto;
      `
    );
  }}

  ${({ hasChildren, isEditing }) => {
    return (
      isEditing &&
      !hasChildren &&
      css`
        min-height: 5rem;
        border: 1px dashed ${colors.darkGray};
      `
    );
  }}
`;

const Box = styled.div`
  background-color: ${(props) => {
    return props.backgroundColor || 'none';
  }};

  ${(props) => {
    if (props.backgroundColor) {
      const textColor = readableColor(
        props.backgroundColor,
        colors.white,
        colors.black,
      );

      return `
        label, p, h1, h2, h3, h4, h5, h6, li {
          color: ${textColor};
        }
      `;
    }

    return '';
  }}

  border-radius: ${(props) => {
    return `${props.borderRadius || 0}rem`;
  }};

  border: ${(props) => {
    if (!props.border) return 'none';

    return `${props.border.width || 1}px ${props.border.style || 'solid'} ${
      props.border.color
    }`;
  }};

  padding: ${(props) => {
    return `${props.padding || 0}rem`;
  }};
`;

type ColumnProps = {
  hasChildren: boolean;
  itemChildren?: any[];
  treeRenderer: React.JSX.Element;
  element: ColumnElement;
};

export type ColumnElement = {
  type: 'column';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  visibilityEquation: string;
  column: {
    columnCount: number;
    isSticky: boolean;
    stackOnMobile: boolean;
    stackOnTablet: boolean;
  };
};

const Column = (props: ColumnProps) => {
  const { hasChildren, itemChildren = [], treeRenderer, element } = props;

  const { column, shouldAddVisibilityLogic } = element;

  const output = useOutput(`${element.reference}-VE`);

  const { isMobile, isTablet } = useCanvasSize();
  const isHidden = shouldAddVisibilityLogic && !output?.result;

  const { isSticky, stackOnTablet, stackOnMobile } = column;

  const shouldStack =
    (isMobile && stackOnMobile) || (isTablet && stackOnTablet);
  const shouldStick = !shouldStack && isSticky;

  const { dataAsPropsRefactor } = useFeatureFlags();

  return (
    <ElementStyleWrapper
      collection="elements"
      element={element}
      isHidden={isHidden}
      styledItem={StyledColumn}
      columnCount={column.columnCount}
      shouldStack={shouldStack}
      shouldStick={shouldStick}
      hasChildren={dataAsPropsRefactor ? hasChildren : itemChildren.length}
    >
      <Box
        backgroundColor={
          column.hasBackgroundColor ? column.backgroundColor : false
        }
        border={
          column.hasBorder
            ? {
                color: column.borderColor,
                style: column.borderStyle,
                width: column.borderWidth,
              }
            : false
        }
        borderRadius={column.borderRadius}
        padding={column.padding}
      >
        {dataAsPropsRefactor ? (
          treeRenderer
        ) : (
          <CalculatorItems {...props} items={itemChildren} />
        )}
      </Box>
    </ElementStyleWrapper>
  );
};

export default Column;
